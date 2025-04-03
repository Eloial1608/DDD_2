import { Nullable } from '@Shared/domain/Nullable'
import { Ticket } from '../domain/Ticket'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type TicketResponseBody = {
    readonly id: string
    readonly eventId: string
    readonly title: string
    readonly description: Nullable<string>
    readonly price: {value: number, currency: string}
    readonly isOnline: boolean
    readonly isOnSite: boolean
}

export class TicketResponse implements QueryResponse<TicketResponseBody> {
  response: TicketResponseBody

  constructor (ticket: Ticket) {
    this.response = {
      id: ticket.id.valueOf(),
      eventId: ticket.eventId.valueOf(),
      title: ticket.title.valueOf(),
      description: ticket.description?.valueOf(),
      price: {
        value: ticket.price.value.valueOf(),
        currency: ticket.price.currency.valueOf()
      },
      isOnline: ticket.isOnline.valueOf(),
      isOnSite: ticket.isOnSite.valueOf()
    }
  }
}
