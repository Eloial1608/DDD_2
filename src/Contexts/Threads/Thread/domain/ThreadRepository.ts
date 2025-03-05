import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Thread } from './Thread'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface ThreadRepository {
    find (id: Id): Promise<Nullable<Thread>>
    search (criteria: Criteria): Promise<Array<Thread>>
    persist (thread: Thread): Promise<void>
}
