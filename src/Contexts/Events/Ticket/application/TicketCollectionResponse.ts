import { Ticket } from '../domain/Ticket'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { TicketResponse, TicketResponseBody } from './TicketResponse'

export class TicketCollectionResponse implements QueryResponse<Array<TicketResponseBody>> {
  response: Array<TicketResponseBody>

  constructor (ticket: Array<Ticket>) {
    this.response = ticket.map(x => new TicketResponse(x).response)
  }
}
