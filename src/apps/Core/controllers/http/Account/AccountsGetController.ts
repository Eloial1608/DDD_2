import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { FindAccountByCriteriaQuery } from '@Core/Account/application/FindByCriteria/FindAccountByCriteriaQuery'
import { AccountCollectionResponse } from '@Core/Account/application/AccountCollectionResponse'

type ResponseBody = {
  readonly id: string
  readonly iban: string
  readonly balance: number
  readonly type_account: string
}

export class AccountsGetController implements Controller {
  constructor (private readonly queryBus: QueryBus) {}

  async run (req: Request, res: Response): Promise<Response> {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      const userIdFilter = new Map<string, string | number | null>([
        ['field', 'userId'],
        ['operator', '='],
        ['value', req.user.id]
      ])

      const query = new FindAccountByCriteriaQuery(
        [userIdFilter],
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      )

      const accounts = await this.queryBus.ask<AccountCollectionResponse>(query)

      return res.status(200).json({
        message: 'Accounts retrieved successfully',
        data: { accounts: this.buildResponse(accounts) }
      })

    } catch (e) {
      if (e instanceof CannotDecode) {
        return res.status(401).json({ message: e.getMessage() })
      }

      console.error('AccountsGetController error:', e)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  private buildResponse (accounts: AccountCollectionResponse): ResponseBody[] {
    return accounts.response.map(x => ({
      id: x.id,
      iban: x.iban,
      balance: x.balance,
      type_account: x.type_account
    }))
  }
}