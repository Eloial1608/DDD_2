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
      const accountId = req.params.id

      if (!accountId) {
        return res.status(400).json({ message: 'Account ID is required' })
      }

      const query = new FindAcountByIdQuery(accountId)
      const accountResponse = await this.queryBus.ask<AccountResponse>(query)

      return res.status(200).json({
        message: 'Account retrieved successfully',
        data: { account: accountResponse.response }
      })
    } catch (e) {
      if (e instanceof CannotDecode) {
        return res.status(401).json({ message: e.getMessage() })
      }

      if (e instanceof AccountNotFound) {
        return res.status(404).json({ message: 'Account not found' })
      }

      console.error('AccountGetController error:', e)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}