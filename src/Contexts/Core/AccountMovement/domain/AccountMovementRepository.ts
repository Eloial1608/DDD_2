import { Nullable } from '@Shared/domain/Nullable'
import { AccountMovementId } from './ValueObjects/AccountMovementId'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { AccountMovement } from './AccountMovement'

export interface AccountMovementRepository {
    find (id: AccountMovementId): Promise<Nullable<AccountMovement>>
    search (criteria: Criteria): Promise<Array<AccountMovement>>
    persist (accountMovement: AccountMovement): Promise<void>
}