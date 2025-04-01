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
      const communityId = req.params.id

      const communityQuery = new FindCommunitiesByCriteriaQuery(
        [new Map<string, string>([
          ['field', 'id'],
          ['operator', '='],
          ['value', communityId]
        ])],
        undefined,
        undefined,
        undefined,
        1
      )

      const mainCommunity = await (await this.queryBus.ask<CommunityCollectionResponse>(communityQuery)).response

      if (req.headers.authorization) {
        const data = await this.decoder.run(req.headers.authorization)

        const user = await this.getUser(data.id, communityId)

        if (user && (user.isAdmin || user.isOwner)) {
          const subcommunitiesQuery = new FindCommunitiesByCriteriaQuery(
            [new Map<string, string>([
              ['field', 'parentId'],
              ['operator', '='],
              ['value', communityId]
            ])]
          )
          const allSubcommunities = (await this.queryBus.ask<CommunityCollectionResponse>(subcommunitiesQuery)).response

          return res.status(200).json({ communities: allSubcommunities })
        }

        const usersQuery = new FindUsersByCriteriaQuery([
          new Map<string, string>([
            ['field', 'mainId'],
            ['operator', '='],
            ['value', data.id]
          ])
        ])

        const users = (await this.queryBus.ask<UserCollectionResponse>(usersQuery)).response

        const subcommunityIds = users.map(u => u.communityId).join(',')

        const subcommunitiesQuery = new FindCommunitiesByCriteriaQuery(
          [new Map<string, string>([
            ['field', 'id'],
            ['operator', 'in'],
            ['value', subcommunityIds]
          ])]
        )

        const filteredSubcommunities = (await this.queryBus.ask<CommunityCollectionResponse>(subcommunitiesQuery)).response

        return res.status(200).json({ communities: filteredSubcommunities })
      }

      return res.status(200).json({ communities: mainCommunity })
    } catch (e) {
      if (e instanceof CommunityNotFound) return res.status(404).json({ message: e.getMessage() })

      return res.status(500).send()
    }
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
}
