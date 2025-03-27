import { DeleteTicketCommand } from '@Events/Ticket/application/Delete/DeleteTicketCommand'
import { Ticket } from '@Events/Ticket/domain/Ticket'

export class DeleteTicketCommandMother {
  static delete (
    id: string
  ): DeleteTicketCommand {
    return new DeleteTicketCommand(
      id
    )
  }

  static fromAggregate (ticket: Ticket): DeleteTicketCommand {
    return this.delete(
      ticket.id.valueOf()
    )
  }
}
