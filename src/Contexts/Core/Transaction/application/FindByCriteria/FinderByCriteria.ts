import { TransactionRepository } from '@Core/Transaction/domain/TransactionRepository'
import { Transaction } from '@Core/Transaction/domain/Transaction'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: TransactionRepository) {}

  async find (criteria: Criteria): Promise<Array<Transaction>> {
    return await this.repository.search(criteria)
  }
}
