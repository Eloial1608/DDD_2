import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { EventUser } from './EventUser'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface EventUserRepository {
    find (id: Id): Promise<Nullable<EventUser>>
    search (criteria: Criteria): Promise<Array<EventUser>>
    persist (eventUser: EventUser): Promise<void>
}
