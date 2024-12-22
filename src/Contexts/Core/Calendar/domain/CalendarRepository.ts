import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Calendar } from './Calendar'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface CalendarRepository {
    find (id: Id): Promise<Nullable<Calendar>>
    search (criteria: Criteria): Promise<Array<Calendar>>
    persist (calendar: Calendar): Promise<void>
    delete (calendar: Calendar): Promise<void>
}
