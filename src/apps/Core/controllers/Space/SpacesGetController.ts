import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { SpaceNotFound } from '@Core/Space/domain/Errors/SpaceNotFound'
import { AllowedAccessibilities } from '@Core/Space/domain/ValueObjects/Accessibility'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { FindUserByIdQuery } from '@Core/User/application/FindById/FindUserByIdQuery'
import { UserResponse } from '@Core/User/application/UserResponse'
import { FindSpaceMembersByCriteriaQuery } from '@Core/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Core/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindSpacesByCriteriaQuery } from '@Core/Space/application/FindByCriteria/FindSpacesByCriteriaQuery'
import { SpaceCollectionResponse } from '@Core/Space/application/SpaceCollectionResponse'
import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'
import { combineCriterias } from '@Shared/infrastructure/Criteria/CombineCriterias'

export class SpacesGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      let userId: string | undefined
      let communityId: string | undefined
      let criteria = buildCriteriaFromUri(req.query.criteria as string)

      if (req.headers.authorization) {
        const data = this.decoder.run(req.headers.authorization)

        userId = data.id
        communityId = data.communityId

        criteria = combineCriterias(this.addCommunityIdCriteria(communityId), criteria)
      } else {
        criteria = combineCriterias(this.addPublicCriteria(), criteria)
      }

      const spacesQuery = new FindSpacesByCriteriaQuery(criteria.filters, criteria.inFilters, criteria.orderBy, criteria.orderType, criteria.limit, criteria.offset)

      const spaces = await (await this.queryBus.ask<SpaceCollectionResponse>(spacesQuery)).response

      const spacesToReturn = []

      for (const space of spaces) {
        if (await this.checkAccessibility(space.accessibility as AllowedAccessibilities, space.id, userId, communityId)) spacesToReturn.push(space)
      }

      return res.status(200).json(spacesToReturn)
    } catch (e) {
      if (e instanceof SpaceNotFound) return res.status(404).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }

  private addCommunityIdCriteria (communityId: string) {
    return {
      filters: [
        new Map<string, string>([
          ['field', 'communityId'],
          ['operator', '='],
          ['value', communityId]
        ])
      ]
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
      if (await this.isAdmin(userId)) return true

      const spaceMember = await this.getSpaceMember(userId, communityId, spaceId)

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

  private async isAdmin (id: string): Promise<boolean> {
    const userQuery = new FindUserByIdQuery(id)

    const user = (await this.queryBus.ask<UserResponse>(userQuery)).response

    return !user.isAdmin || !user.isOwner
  }
}
