import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { SpaceNotFound } from '@Events/Space/domain/Errors/SpaceNotFound'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { FindSpaceMembersByCriteriaQuery } from '@Events/SpaceMember/application/FindByCriteria/FindSpaceMembersByCriteriaQuery'
import { SpaceMemberCollectionResponse } from '@Events/SpaceMember/application/SpaceMemberCollectionResponse'
import { FindSpacesByCriteriaQuery } from '@Events/Space/application/FindByCriteria/FindSpacesByCriteriaQuery'
import { SpaceCollectionResponse } from '@Events/Space/application/SpaceCollectionResponse'
import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'
import { combineCriterias } from '@Shared/infrastructure/Criteria/CombineCriterias'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindUsersByCriteriaQuery } from '@Events/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Events/User/application/UserCollectionResponse'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'

export class SpaceMembersGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      let userId: string | undefined
      let communityId: string | undefined
      let criteria = buildCriteriaFromUri(req.query.criteria as string)

      const spaceId = criteria.filters?.find(x => x.get('field') === 'spaceId')?.get('value')

      if (!spaceId) return res.status(400).send()

      const space = await this.getSpace(spaceId as string)

      if (!space) return res.status(404).send()

      if (space.accessibility !== AllowedAccessibilities.PUBLIC) {
        if (req.headers.authorization) {
          const data = this.decoder.run(req.headers.authorization)

          userId = data.id
          communityId = space.communityId

          const user = await this.getUser(userId, communityId)

          if (!user) return res.status(401).send()

          if (!user.isAdmin && !user.isOwner) {
            const spaceMember = await this.getSpaceMember(user.id, communityId, space.id)
            if (!spaceMember) return res.status(401).send()
          }

          criteria = combineCriterias(this.addCommunityIdCriteria(communityId), criteria)
        }
      }

      const spaceMemberQuery = new FindSpaceMembersByCriteriaQuery(criteria.filters, criteria.inFilters, criteria.orderBy, criteria.orderType, criteria.limit, criteria.offset)

      const spacesMembers = await (await this.queryBus.ask<SpaceMemberCollectionResponse>(spaceMemberQuery)).response

      return res.status(200).json(spacesMembers)
    } catch (e) {
      if (e instanceof SpaceNotFound) return res.status(404).json({ message: e.getMessage() })
      if (e instanceof CannotDecode) return res.status(401).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }

  private async getSpace (spaceId: string) {
    const query = new FindSpacesByCriteriaQuery([
      new Map<string, string>([
        ['field', 'id'],
        ['operator', '='],
        ['value', spaceId]
      ])
    ])

    return (await this.queryBus.ask<SpaceCollectionResponse>(query)).response.pop()
  }

  private async getUser (userId: string, communityId: string) {
    const query = new FindUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'mainId'],
        ['operator', '='],
        ['value', userId]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId]
      ])
    ])

    return (await this.queryBus.ask<UserCollectionResponse>(query)).response.pop()
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

    return (await this.queryBus.ask<SpaceMemberCollectionResponse>(query)).response.pop()
  }
}
