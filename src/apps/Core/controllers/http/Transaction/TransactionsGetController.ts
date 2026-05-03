import { Request, Response } from 'express'
import { Controller } from '../../@types/Controller'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { CannotDecode } from '@Shared/domain/TokenDecoder/Errors/CannotDecode'
import { buildCriteriaFromUri } from '@Shared/infrastructure/Criteria/BuildCriteriaFromUri'

import { TransactionCollectionResponse } from '@Core/Transaction/application/TransactionCollectionResponse'
import { FindTransactionsByCriteriaQuery } from '@Core/Transaction/application/FindByCriteria/FindTransactionsByCriteriaQuery'

type ResponseBody = {
  readonly id: string
  readonly fromAccountId: string | null
  readonly toAccountId: string | null
  readonly balance: number
  readonly concept: string | null
  readonly reference: string | null
  readonly status: string
  readonly createdAt: string
}

export class TransactionsGetController implements Controller {
  constructor(private readonly queryBus: QueryBus) {}

  async run (req: Request, res: Response): Promise<Response> {
      try {
        const criteria = buildCriteriaFromUri(req.query.criteria as string)
  
        const query = new FindTransactionsByCriteriaQuery(
          criteria.filters,
          criteria.inFilters,
          criteria.orderBy,
          criteria.orderType,
          criteria.limit,
          criteria.offset
        )
  
        const accounts = await this.queryBus.ask<TransactionCollectionResponse>(query)
  
        return res.status(200).json(this.buildResponse(accounts))
  
      } catch (e) {
        if (e instanceof CannotDecode) {
          return res.status(401).send(e.getMessage())
        }
  
        return res.status(500).send()
      }
    }

  private buildResponse(
    transactions: TransactionCollectionResponse
  ): ResponseBody[] {
    return transactions.response.map(x => ({
      id: x.id,
      fromAccountId: x.fromAccountId ?? null,
      toAccountId: x.toAccountId ?? null,
      balance: x.balance,
      concept: x.concept ?? null,
      reference: x.reference ?? null,
      status: x.status,
      createdAt: new Date(x.createdAt).toISOString()
    }))
  }
}