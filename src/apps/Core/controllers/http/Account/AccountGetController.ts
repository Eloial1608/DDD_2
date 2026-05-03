import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { AccountResponse } from '@Core/Account/application/AccountResponse'
import { AccountNotFound } from '@Core/Account/domain/Errors/AccountNotFound'
import { FindAcountByIdQuery } from '@Core/Account/application/FindById/FindAccountByIdQuery'

export class AccountGetController implements Controller {
  constructor (private readonly queryBus: QueryBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      const query = new FindAcountByIdQuery(req.params.id)
      const accountResponse = await this.queryBus.ask<AccountResponse>(query)
      return res.status(200).json(accountResponse.response)

    } catch (e) {
      if (e instanceof CannotDecode) {
        return res.status(401).send(e.getMessage())
      }

      if (e instanceof AccountNotFound) {
        return res.status(404).json({ message: e.getMessage() })
      }

      return res.status(500).send()
    }
  }
}