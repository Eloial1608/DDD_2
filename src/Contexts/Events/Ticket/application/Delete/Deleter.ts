import { Id } from '@Events/Ticket/domain/ValueObjects/Id'
import { TicketRepository } from '@Events/Ticket/domain/TicketRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Deleter {
  constructor (
    private readonly repository: TicketRepository,
    private readonly eventBus: EventBus
  ) {}

  async run (
    id: Id
  ): Promise<void> {
    const existingTicket = await this.repository.find(id)

    if (!existingTicket) return

    const ticket = existingTicket.delete()

    await this.repository.persist(ticket)

    await this.eventBus.publish(ticket.pullDomainEvents())
  }
}
