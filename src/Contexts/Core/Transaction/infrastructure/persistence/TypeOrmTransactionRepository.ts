import { Transaction } from '@Core/Transaction/domain/Transaction'
import { TransactionRepository } from '@Core/Transaction/domain/TransactionRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { TransactionSchema } from './entity/TransactionSchema'
import { Id } from '@Core/Transaction/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmTransactionRepository extends TypeOrmRepository<Transaction> implements TransactionRepository {
  protected get entitySchema (): EntitySchema {
    return TransactionSchema
  }

  async find (id: Id): Promise<Nullable<Transaction>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Transaction[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (Transaction: Transaction): Promise<void> {
    await (await this.repository()).save(Transaction)
    
  }
}