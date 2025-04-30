import { Nullable } from '@Shared/domain/Nullable'
import { Id } from './ValueObjects/Id'
import { Ticket } from './Ticket'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export interface TicketRepository {
    find (id: Id): Promise<Nullable<Ticket>>
    search (criteria: Criteria): Promise<Array<Ticket>>
    persist (ticket: Ticket): Promise<void>
    delete (ticket: Ticket): Promise<void>
}
