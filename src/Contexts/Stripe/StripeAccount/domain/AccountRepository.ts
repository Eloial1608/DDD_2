import { Nullable } from '@Shared/domain/Nullable'
import { StripeAccount } from './StripeAccount'
import { Id } from './ValueObjects/Id'

export interface AccountRepository {
    find (id: Id): Promise<Nullable<StripeAccount>>
    persist (account: StripeAccount): Promise<void>
}
