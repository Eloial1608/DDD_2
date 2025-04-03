import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { EventUser } from '@Events/EventUser/domain/EventUser'
import { EventUserRepository } from '@Events/EventUser/domain/EventUserRepository'
import { Id } from '@Events/EventUser/domain/ValueObjects/Id'
import { UserId } from '@Events/EventUser/domain/ValueObjects/UserId'
import { EventId } from '@Events/EventUser/domain/ValueObjects/EventId'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindTicketByIdQuery } from '@Events/Ticket/application/FindById/FindTicketByIdQuery'
import { TicketResponse } from '@Events/Ticket/application/TicketResponse'
import { IsOnline } from '@Events/EventUser/domain/ValueObjects/IsOnline'
import { IsOnSite } from '@Events/EventUser/domain/ValueObjects/IsOnSite'
import { TicketId } from '@Events/EventUser/domain/ValueObjects/TicketId'

export class Creator {
  constructor (
    private readonly repository: EventUserRepository,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus
  ) {}

  async run (
    id: Id,
    userId: UserId,
    ticketId: TicketId
  ) {
    const ticket = await this.getTicket(ticketId)

    const eventUser = EventUser.create(
      id,
      userId,
      new EventId(ticket.eventId),
      new IsOnline(ticket.isOnline),
      new IsOnSite(ticket.isOnSite),
      ticketId
    )

    await this.repository.persist(eventUser)
    await this.eventBus.publish(eventUser.pullDomainEvents())
  }

  private async getTicket (ticketId: TicketId) {
    const query = new FindTicketByIdQuery(ticketId.valueOf())

    return (await this.queryBus.ask<TicketResponse>(query)).response
  }
}
