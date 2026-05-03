import { TransactionRepository } from '@Core/Transaction/domain/TransactionRepository'
import { Id } from '@Core/Transaction/domain/ValueObjects/Id'
import { Transaction } from '@Core/Transaction/domain/Transaction'
import { TransactionNotFound } from '@Core/Transaction/domain/Errors/TransactionNotFound'

export class FinderById {
  constructor (private readonly repository: TransactionRepository) {}

  async find (id: Id): Promise<Transaction> {
    const transaction = await this.repository.find(id)

    if (!transaction) throw new TransactionNotFound(id)

    return transaction
  }
}
