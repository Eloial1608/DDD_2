import { TicketRepository } from '@Events/Ticket/domain/TicketRepository'
import { Id } from '@Events/Ticket/domain/ValueObjects/Id'
import { Ticket } from '@Events/Ticket/domain/Ticket'
import { TicketNotFound } from '@Events/Ticket/domain/Errors/TicketNotFound'

export class FinderById {
  constructor (private readonly repository: TicketRepository) {}

  async find (id: Id): Promise<Ticket> {
    const ticket = await this.repository.find(id)

    if (!ticket) throw new TicketNotFound(id)

    return ticket
  }
}
