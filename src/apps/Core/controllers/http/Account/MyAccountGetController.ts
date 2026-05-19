import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { UserCollectionResponse } from '@Core/User/application/UserCollectionResponse'
import { FindUserByIdQuery } from '@Core/User/application/FindById/FindUserByIdQuery'

export class MyAccountGetController implements Controller {
  constructor (
    private readonly queryBus: QueryBus,
    private readonly decoder: TokenDecoder
  ) {}

  async run (req: Request, res: Response): Promise<Response> {
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
        return res.status(401).json({ message: 'Invalid token payload' })
      }

      const query = new FindUserByIdQuery(data.id)

      const response = await this.queryBus.ask<UserCollectionResponse>(query)

      const user = response.response?.[0]

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      return res.status(200).json({ user })

    } catch (e) {
      if (e instanceof CannotDecode) {
        return res.status(401).json({ message: 'Invalid token' })
      }

      console.error('Error en MyAccountGetController:', e)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}