import { Id } from '@Auth/AuthUser/domain/ValueObjects/Id'
import { Title } from './Title'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface TitleRepository {
    find (id: Id): Promise<Nullable<Title>>
    search (criteria: Criteria): Promise<Array<Title>>
    persist (title: Title): Promise<void>
}
