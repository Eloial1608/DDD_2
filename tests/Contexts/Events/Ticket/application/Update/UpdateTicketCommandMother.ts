import { UpdateTicketCommand } from '@Events/Ticket/application/Update/UpdateTicketCommand'
import { Ticket } from '@Events/Ticket/domain/Ticket'
import { Nullable } from '@Shared/domain/Nullable'

export class UpdateTicketCommandMother {
  static update (
    id: string,
    title: string,
    description: Nullable<string>,
    price: {value: number, currency: string}
  ): UpdateTicketCommand {
    return new UpdateTicketCommand(
      id,
      title,
      description,
      price
    )
  }

  static fromAggregate (ticket: Ticket): UpdateTicketCommand {
    return this.update(
      ticket.id.valueOf(),
      ticket.title.valueOf(),
      ticket.description?.valueOf(),
      {
        value: ticket.price.value.valueOf(),
        currency: ticket.price.currency.valueOf()
      }
    )
  }
}
