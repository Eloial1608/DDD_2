import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindCardsByUserIdQuery } from '@Core/Card/application/FindByUserId/FindCardsByUserIdQuery'
import { CardCollectionResponse } from '@Core/Card/application/CardCollectionResponse'

export class MyCardGetController implements Controller {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly decoder: TokenDecoder
  ) {}

  async run(req: Request, res: Response): Promise<Response> {
    try {
      const authHeader = req.headers.authorization

      if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' })
      }

      const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7)
        : authHeader

      const data = await this.decoder.run(token)
      if (!data?.id) {
        return res.status(401).json({ message: 'Invalid token' })
      }

      const query = new FindCardsByUserIdQuery(data.id)
      const response = await this.queryBus.ask<CardCollectionResponse>(query)

      return res.status(200).json({ cards: response.response })
    } catch (e) {
      if (e instanceof CannotDecode) {
        return res.status(401).json({ message: 'Invalid token' })
      }

      console.error('Error en MyCardGetController:', e)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}