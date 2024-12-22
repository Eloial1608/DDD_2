import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { SpaceNotFound } from '@Core/Space/domain/Errors/SpaceNotFound'
import { AllowedAccessibilities } from '@Core/Space/domain/ValueObjects/Accessibility'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { FindSpaceMembersByCriteriaQuery } from '@Core/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Core/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindSpacesByCriteriaQuery } from '@Core/Space/application/FindByCriteria/FindSpacesByCriteriaQuery'
import { SpaceCollectionResponse } from '@Core/Space/application/SpaceCollectionResponse'
import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'
import { combineCriterias } from '@Shared/infrastructure/Criteria/CombineCriterias'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindUsersByCriteriaQuery } from '@Core/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Core/User/application/UserCollectionResponse'
import { UserResponseBody } from '@Core/User/application/UserResponse'

export class SpacesGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  private user: UserResponseBody | undefined

  async run (req: Request, res: Response): Promise<Response> {
    try {
      let userId: string | undefined
      let criteria = buildCriteriaFromUri(req.query.criteria as string)

      if (req.headers.authorization) {
        const data = this.decoder.run(req.headers.authorization)

        userId = data.id
      } else {
        criteria = combineCriterias(this.addPublicCriteria(), criteria)
      }

      const spacesQuery = new FindSpacesByCriteriaQuery(criteria.filters, criteria.inFilters, criteria.orderBy, criteria.orderType, criteria.limit, criteria.offset)

      const spaces = await (await this.queryBus.ask<SpaceCollectionResponse>(spacesQuery)).response

      const spacesToReturn = []

      for (const space of spaces) {
        if (await this.checkAccessibility(space.accessibility as AllowedAccessibilities, space.id, userId, space.communityId)) spacesToReturn.push(space)
      }

      return res.status(200).json(spacesToReturn)
    } catch (e) {
      if (e instanceof SpaceNotFound) return res.status(404).json({ message: e.getMessage() })
      if (e instanceof CannotDecode) return res.status(401).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }

  private addPublicCriteria () {
    return {
      filters: [
        new Map<string, string>([
          ['field', 'accessibility'],
          ['operator', '='],
          ['value', AllowedAccessibilities.PUBLIC]
        ])
      ]
    }
  }

  private async checkAccessibility (accessibility: AllowedAccessibilities, spaceId: string, userId?: string, communityId?: string): Promise<boolean> {
    if (accessibility === AllowedAccessibilities.PUBLIC) return true

    if (userId && communityId) {
      if (!this.user) {
        this.user = await this.getUser(userId, communityId)
      }

      if (!this.user) return false

      if (this.user.isAdmin || this.user.isOwner) return true

      const spaceMember = await this.getSpaceMember(this.user.id, communityId, spaceId)

      if (spaceMember) return true
    }

    return false
  }

  private async getSpaceMember (userId: string, communityId: string, spaceId: string) {
    const query = new FindSpaceMembersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'userId'],
        ['operator', '='],
        ['value', userId]
      ]),
      new Map<string, string>([
        ['field', 'spaceId'],
        ['operator', '='],
        ['value', spaceId]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId]
      ])
    ])

    return (await this.queryBus.ask<SpaceMemberCollectionResponse>(query)).response
  }

  private async getUser (id: string, communityId: string) {
    const query = new FindUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'mainId'],
        ['operator', '='],
        ['value', id]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId]
      ])
    ])

    const user = (await this.queryBus.ask<UserCollectionResponse>(query)).response.pop()

    return user
  }
}
