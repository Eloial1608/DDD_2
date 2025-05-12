import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Product } from './Product'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface ProductRepository {
    find (id: Id): Promise<Nullable<Product>>
    search (criteria: Criteria): Promise<Array<Product>>
    persist (product: Product): Promise<void>
}
