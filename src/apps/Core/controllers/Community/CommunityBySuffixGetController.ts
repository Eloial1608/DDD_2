import { Request, Response } from 'express'
import { Controller } from '../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindCommunitiesByCriteriaQuery } from '@Core/Community/application/FindByCriteria/FindCommunitiesByCriteriaQuery'
import { CommunityCollectionResponse } from '@Core/Community/application/CommunityCollectionResponse'

export class CommunityBySuffixGetController implements Controller {
  constructor (private readonly queryBus: QueryBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const suffix = req.params.suffix

      const query = new FindCommunitiesByCriteriaQuery(
        [
          new Map<string, string>([
            ['field', 'suffix'],
            ['operator', '='],
            ['value', suffix]
          ])
        ],
        undefined,
        undefined,
        undefined,
        1
      )

      const response = await this.queryBus.ask<CommunityCollectionResponse>(query)

      const community = response.response.pop()

      if (!community) return res.status(404).send()

      return res.status(200).json({ ...community, spaceOrderedIds: JSON.parse(community.spaceOrderedIds) })
    } catch (e) {
      return res.status(500).send()
    }
  }
}
