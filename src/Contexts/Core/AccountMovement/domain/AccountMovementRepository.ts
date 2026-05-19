import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { AccountMovement } from './AccountMovement'

export interface AccountMovementRepository {
    find (id: Id): Promise<Nullable<AccountMovement>>
    search (criteria: Criteria): Promise<Array<AccountMovement>>
    persist (accountMovement: AccountMovement): Promise<void>
}