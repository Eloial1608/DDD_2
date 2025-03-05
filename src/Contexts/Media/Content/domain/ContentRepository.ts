import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Content } from './Content'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface ContentRepository {
    find (id: Id): Promise<Nullable<Content>>
    search (criteria: Criteria): Promise<Array<Content>>
    persist (content: Content): Promise<void>
    delete (content: Content): Promise<void>
}
