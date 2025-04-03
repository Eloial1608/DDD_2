import { TicketRepository } from '@Events/Ticket/domain/TicketRepository'
import { Description } from '@Events/Ticket/domain/ValueObjects/Description'
import { Id } from '@Events/Ticket/domain/ValueObjects/Id'
import { Price } from '@Events/Ticket/domain/ValueObjects/Price'
import { Title } from '@Events/Ticket/domain/ValueObjects/Title'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'

type Params = {
    id: Id,
    title: Title,
    description: Nullable<Description>,
    price: Price
}

export class Updater {
  constructor (
    private readonly repository: TicketRepository,
    private readonly eventBus: EventBus
  ) {}

  async run (params: Params): Promise<void> {
    const existing = await this.repository.find(params.id)

    if (!existing) return

    const ticket = existing.update(
      params.title,
      params.description,
      params.price
    )

    await this.repository.persist(ticket)
    await this.eventBus.publish(ticket.pullDomainEvents())
  }
}
