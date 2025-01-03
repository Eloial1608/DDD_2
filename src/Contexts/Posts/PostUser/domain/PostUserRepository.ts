import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { PostUser } from './PostUser'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface PostUserRepository {
    find (id: Id): Promise<Nullable<PostUser>>
    search (criteria: Criteria): Promise<Array<PostUser>>
    persist (postUser: PostUser): Promise<void>
}
