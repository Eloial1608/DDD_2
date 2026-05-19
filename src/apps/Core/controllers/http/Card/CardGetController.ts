import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindCardByIdQuery } from '@Core/Card/application/FindById/FindCardByIdQuery'
import { CardResponse } from '@Core/Card/application/CardResponse'
import { CardNotFound } from '@Core/Card/domain/Errors/CardNotFound'

export class CardGetController implements Controller {
  constructor (private readonly queryBus: QueryBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const cardId = req.params.id

      if (!cardId) {
        return res.status(400).json({ message: 'Card ID is required' })
      }

      const query = new FindCardByIdQuery(cardId)

      const card = (await this.queryBus.ask<CardResponse>(query)).response

      return res.status(200).json({
        message: 'Card retrieved successfully',
        data: { card }
      })
    } catch (e) {
      if (e instanceof CannotDecode) {
        return res.status(401).json({ message: e.getMessage() })
      }
      if (e instanceof CardNotFound) {
        return res.status(404).json({ message: 'Card not found' })
      }

      console.error('CardGetController error:', e)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}