import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { PageView } from './PageView'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface PageViewRepository {
    find (id: Id): Promise<Nullable<PageView>>
    search (criteria: Criteria): Promise<Array<PageView>>
    persist (pageview: PageView): Promise<void>
}