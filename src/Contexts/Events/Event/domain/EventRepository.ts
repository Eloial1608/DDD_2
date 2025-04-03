import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Event } from './Event'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface EventRepository {
    find (id: Id): Promise<Nullable<Event>>
    search (criteria: Criteria): Promise<Array<Event>>
    persist (event: Event): Promise<void>
}
