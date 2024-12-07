import { Nullable } from '@Shared/domain/Nullable'
import { Account } from './Account'
import { Id } from './ValueObjects/Id'

export interface AccountRepository{
    find (id: Id): Promise<Nullable<Account>>
    persist (account: Account) :Promise<void>
}
