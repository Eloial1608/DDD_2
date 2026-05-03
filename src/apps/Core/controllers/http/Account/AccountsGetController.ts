import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'
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
      const criteria = buildCriteriaFromUri(req.query.criteria as string)

      const query = new FindAccountByCriteriaQuery(
        criteria.filters,
        criteria.inFilters,
        criteria.orderBy,
        criteria.orderType,
        criteria.limit,
        criteria.offset
      )

      const accounts = await this.queryBus.ask<AccountCollectionResponse>(query)

      return res.status(200).json(this.buildResponse(accounts))

    } catch (e) {
      if (e instanceof CannotDecode) {
        return res.status(401).send(e.getMessage())
      }

      return res.status(500).send()
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