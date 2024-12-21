import { Nullable } from '@Shared/domain/Nullable'
import { StripeProduct } from './StripeProduct'
import { Id } from './ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface StripeProductRepository {
    find (id: Id): Promise<Nullable<StripeProduct>>
    search (criteria: Criteria): Promise<StripeProduct[]>
    persist (product: StripeProduct): Promise<void>
    delete (product: StripeProduct): Promise<void>
}
