import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { CardCollectionResponse } from '@Core/Card/application/CardCollectionResponse'
import { FindCardsByUserIdQuery } from '@Core/Card/application/FindByUserId/FindCardsByUserIdQuery'
import { CardTypeEnum } from '@Core/Card/domain/ValueObjects/Type_Card'

type ResponseBody = {
  readonly id: string
  readonly accountId: string
  readonly numCard: string
  readonly type_Card: CardTypeEnum
  readonly balance: number
  readonly expiration: Date
}

export class MyCardGetController implements Controller {
  constructor(private readonly queryBus: QueryBus) {}

  async run(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      const query = new FindCardsByUserIdQuery(req.user.id)
      const cards = await this.queryBus.ask<CardCollectionResponse>(query)

      return res.status(200).json({
        message: 'Cards retrieved successfully',
        data: { cards: this.buildResponse(cards) }
      })
    } catch (e) {
      console.error('CardsGetController error:', e)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  private buildResponse(cards: CardCollectionResponse): ResponseBody[] {
    return cards.response.map(x => ({
      id: x.id,
      accountId: x.accountId,
      numCard: this.maskCardNumber(x.numCard),
      type_Card: x.type_Card,
      balance: x.balance,
      expiration: x.expiration
    }))
  }

  private maskCardNumber(cardNumber: string): string {
    const lastFourDigits = cardNumber.slice(-4)
    return `****${lastFourDigits}`
  }
}