import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Transaction } from './Transaction'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface TransactionRepository {
    find (id: Id): Promise<Nullable<Transaction>>
    search (criteria: Criteria): Promise<Array<Transaction>>
    persist (transaction: Transaction): Promise<void>
}