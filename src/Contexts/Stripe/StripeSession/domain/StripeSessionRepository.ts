import { Nullable } from '@Shared/domain/Nullable'
import { StripeSession } from './StripeSession'
import { Id } from './ValueObjects/Id'

export interface StripeSessionRepository {
    find (id: Id): Promise<Nullable<StripeSession>>
    persist (session: StripeSession): Promise<void>
}
