import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { FindUsersByCriteriaQuery } from '@Core/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { FindCommunityByIdQuery } from '@Core/Community/application/FindById/FindCommunityByIdQuery'
import { CommunityResponse } from '@Core/Community/application/CommunityResponse'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { CommunityNotFound } from '@Core/Community/domain/Errors/CommunityNotFound'
import { UserCollectionResponse } from '@Core/User/application/UserCollectionResponse'

export class MyselfGetController implements Controller {
  constructor (private readonly queryBus: QueryBus, private readonly decoder: TokenDecoder) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.headers.authorization || !req.params.communityId) return res.status(401).send()

      const data = await this.decoder.run(req.headers.authorization)

      const communityQuery = new FindCommunityByIdQuery(req.params.communityId)

      const community = await (await this.queryBus.ask<CommunityResponse>(communityQuery)).response

      if ((community.mainId ?? community.id) !== data.communityId) return res.status(401).send()

      const query = new FindUsersByCriteriaQuery([
        new Map<string, string>([
          ['field', 'mainId'],
          ['operator', '='],
          ['value', data.id]
        ]),
        new Map<string, string>([
          ['field', 'communityId'],
          ['operator', '='],
          ['value', req.params.communityId]
        ])
      ])

      const user = (await this.queryBus.ask<UserCollectionResponse>(query)).response.pop()

      return res.status(200).json(user)
    } catch (e) {
      console.log(e)
      if (e instanceof CannotDecode) return res.status(401).send(e.getMessage())
      if (e instanceof CommunityNotFound) res.status(401).send(e.getMessage())

      return res.status(500).send()
    }
  }
}
