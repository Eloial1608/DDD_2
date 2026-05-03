import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Account } from '@Core/Account/domain/Account'

export interface AccountRepository {
    find (id: Id): Promise<Nullable<Account>>
    search (criteria: Criteria): Promise<Array<Account>>
    persist (Account: Account): Promise<void>
}