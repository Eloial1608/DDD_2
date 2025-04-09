import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { CommunityNotFound } from '@Core/Community/domain/Errors/CommunityNotFound'
import { FindCommunitiesByCriteriaQuery } from '@Core/Community/application/FindByCriteria/FindCommunitiesByCriteriaQuery'
import { CommunityCollectionResponse } from '@Core/Community/application/CommunityCollectionResponse'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { FindUsersByCriteriaQuery } from '@Core/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Core/User/application/UserCollectionResponse'

export class SubcommunityByUserGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) { }

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const usersQuery = new FindUsersByCriteriaQuery([
        new Map<string, string>([
          ['field', 'mainId'],
          ['operator', '='],
          ['value', data.id]
        ])
      ])

      const users = (await this.queryBus.ask<UserCollectionResponse>(usersQuery)).response

      const communityIds = users.map(u => u.communityId).join(',')

      const communitiesQuery = new FindCommunitiesByCriteriaQuery(
        [new Map<string, string>([
          ['field', 'id'],
          ['operator', 'IN'],
          ['value', communityIds]
        ])]
      )

      const filteredSubcommunities = (await this.queryBus.ask<CommunityCollectionResponse>(communitiesQuery)).response

      return res.status(200).json({ communities: filteredSubcommunities })
    } catch (e) {
      if (e instanceof CommunityNotFound) return res.status(404).json({ message: e.getMessage() })
      console.log(e)
      return res.status(500).send()
    }
  }
}
