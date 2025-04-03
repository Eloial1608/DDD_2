import { CreateTicketCommand } from '@Events/Ticket/application/Create/CreateTicketCommand'
import { Ticket } from '@Events/Ticket/domain/Ticket'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateTicketCommandMother {
  static create (
    id: string,
    eventId: string,
    title: string,
    description: Nullable<string>,
    price: {value: number, currency: string},
    isOnline: boolean,
    isOnSite: boolean
  ): CreateTicketCommand {
    return new CreateTicketCommand(
      id,
      eventId,
      title,
      description,
      price,
      isOnline,
      isOnSite
    )
  }

  static fromAggregate (ticket: Ticket): CreateTicketCommand {
    return this.create(
      ticket.id.valueOf(),
      ticket.eventId.valueOf(),
      ticket.title.valueOf(),
      ticket.description?.valueOf(),
      {
        value: ticket.price.value.valueOf(),
        currency: ticket.price.currency.valueOf()
      },
      ticket.isOnline.valueOf(),
      ticket.isOnSite.valueOf()
    )
  }
}
