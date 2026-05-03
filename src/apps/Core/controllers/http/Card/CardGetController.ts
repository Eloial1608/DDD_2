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
      const query = new FindCardByIdQuery(req.params.id)

      const card = (await this.queryBus.ask<CardResponse>(query)).response

      return res.status(200).json(card)
    } catch (e) {
      if (e instanceof CannotDecode) return res.status(401).send(e.getMessage())
      if (e instanceof CardNotFound) return res.status(404).json({ message: e.getMessage() })

      return res.status(500).send()
    }
  }
}