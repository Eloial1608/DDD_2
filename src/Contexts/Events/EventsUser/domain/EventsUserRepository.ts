import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { EventsUser } from './EventsUser'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface EventsUserRepository {
    find (id: Id): Promise<Nullable<EventsUser>>
    search (criteria: Criteria): Promise<Array<EventsUser>>
    persist (eventsUser: EventsUser): Promise<void>
}
