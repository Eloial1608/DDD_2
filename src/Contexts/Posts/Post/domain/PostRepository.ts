import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Post } from './Post'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface PostRepository {
    find (id: Id): Promise<Nullable<Post>>
    search (criteria: Criteria): Promise<Array<Post>>
    persist (post: Post): Promise<void>
}
