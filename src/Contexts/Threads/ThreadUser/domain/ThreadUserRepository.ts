import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { ThreadUser } from './ThreadUser'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface ThreadUserRepository {
    find (id: Id): Promise<Nullable<ThreadUser>>
    search (criteria: Criteria): Promise<Array<ThreadUser>>
    persist (threadUser: ThreadUser): Promise<void>
}
