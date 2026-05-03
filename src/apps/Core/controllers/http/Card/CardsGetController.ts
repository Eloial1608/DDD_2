import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'
import { CardCollectionResponse } from '@Core/Card/application/CardCollectionResponse'
import { FindCardsByCriteriaQuery } from '@Core/Card/application/FindByCriteria/FindCardByCriteriaQuery'
import { CardTypeEnum } from '@Core/Card/domain/ValueObjects/Type_Card'

type ResponseBody = {
  readonly id: string
  readonly accountId: string
  readonly numCard: string
  readonly type_Card: CardTypeEnum
  readonly balance: number
  readonly expiration: Date
}

export class CardsGetController implements Controller {
  constructor(private readonly queryBus: QueryBus) {}

  async run(req: Request, res: Response): Promise<Response> {
    try {
      const criteria = buildCriteriaFromUri(req.query.criteria as string)

      const query = new FindCardsByCriteriaQuery(
        criteria.filters,
        criteria.inFilters,
        criteria.orderBy,
        criteria.orderType,
        criteria.limit,
        criteria.offset
      )

      const cards = await this.queryBus.ask<CardCollectionResponse>(query)

      return res.status(200).json(this.buildResponse(cards))
    } catch (e) {
      if (e instanceof CannotDecode)
        return res.status(401).send(e.getMessage())

      return res.status(500).send()
    }
  }

  private buildResponse(cards: CardCollectionResponse): ResponseBody[] {
    return cards.response.map(x => ({
      id: x.id,
      accountId: x.accountId,
      numCard: x.numCard,
      type_Card: x.type_Card,
      balance: x.balance,
      expiration: x.expiration
    }))
  }
}