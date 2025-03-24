import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Comment } from './Comment'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface CommentRepository {
    find (id: Id): Promise<Nullable<Comment>>
    search (criteria: Criteria): Promise<Array<Comment>>
    persist (comment: Comment): Promise<void>
    delete (comment: Comment): Promise<void>
}
