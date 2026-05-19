import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { TokenDecoder } from '@Shared/domain/TokenDecoder/TokenDecoder'
import { FindAccountsByUserIdQuery } from '@Core/Account/application/FindById/FindAccountsByUserIdQuery'
import { AccountCollectionResponse } from '@Core/Account/application/AccountCollectionResponse'

export class FindMyAccountsController implements Controller {
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
        return res.status(401).json({ message: 'Invalid token payload' })
      }

      const query = new FindAccountsByUserIdQuery(data.id)
      const accountResponse = await this.queryBus.ask<AccountCollectionResponse>(query)

      return res.status(200).json(accountResponse.response ?? [])
    } catch (e) {
      if (e instanceof CannotDecode) {
        return res.status(401).json({ message: e.getMessage() })
      }

      console.error('Error en FindMyAccountsController:', e)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}