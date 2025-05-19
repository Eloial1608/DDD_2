import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Review } from './Review'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface ReviewRepository {
    find (id: Id): Promise<Nullable<Review>>
    search (criteria: Criteria): Promise<Array<Review>>
    persist (review: Review): Promise<void>
}
 