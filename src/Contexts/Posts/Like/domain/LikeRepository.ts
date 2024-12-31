import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Like } from './Like'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface LikeRepository{
        find (id: Id): Promise<Nullable<Like>>
        search (criteria: Criteria): Promise<Array<Like>>
        persist (like: Like): Promise<void>
}
