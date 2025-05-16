import { EventResponse } from '@Events/Event/application/EventResponse'
import { FindEventByIdQuery } from '@Events/Event/application/FindById/FindEventByIdQuery'
import { EventAccessibilities } from '@Events/Event/domain/ValueObjects/Accessibility'
import { InvalidType } from '@Events/Ticket/domain/Errors/InvalidType'
import { Ticket } from '@Events/Ticket/domain/Ticket'
import { TicketRepository } from '@Events/Ticket/domain/TicketRepository'
import { CommunityId } from '@Events/Ticket/domain/ValueObjects/CommunityId'
import { Description } from '@Events/Ticket/domain/ValueObjects/Description'
import { EventId } from '@Events/Ticket/domain/ValueObjects/EventId'
import { Id } from '@Events/Ticket/domain/ValueObjects/Id'
import { IsOnline } from '@Events/Ticket/domain/ValueObjects/IsOnline'
import { IsOnSite } from '@Events/Ticket/domain/ValueObjects/IsOnSite'
import { Price } from '@Events/Ticket/domain/ValueObjects/Price'
import { Title } from '@Events/Ticket/domain/ValueObjects/Title'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'

type Params = {
    id: Id,
    eventId: EventId,
    title: Title,
    description: Nullable<Description>,
    price: Price,
    isOnline: IsOnline,
    isOnSite: IsOnSite,
    communityId: CommunityId
}

export class Creator {
  constructor (
    private readonly repository: TicketRepository,
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus
  ) {}

  async run (params: Params): Promise<void> {
    const existing = await this.repository.find(params.id)

    if (existing) return

    const event = await this.getEvent(params.eventId)

    await this.checkEventType(
      event.accessibility as EventAccessibilities,
      params.isOnline.valueOf(),
      params.isOnSite.valueOf()
    )

    const ticket = Ticket.create(
      params.id,
      params.eventId,
      params.title,
      params.description,
      params.price,
      params.isOnline,
      params.isOnSite,
      params.communityId
    )

    await this.repository.persist(ticket)
    await this.eventBus.publish(ticket.pullDomainEvents())
  }

  private async getEvent (eventId: EventId) {
    const query = new FindEventByIdQuery(eventId.valueOf())

    return (await this.queryBus.ask<EventResponse>(query)).response
  }

  private async checkEventType (
    eventType: EventAccessibilities,
    isOnline: boolean,
    isOnSite: boolean
  ) {
    if ([EventAccessibilities.ONLINE].includes(eventType) && isOnSite) {
      throw new InvalidType(eventType)
    }

    if ([EventAccessibilities.ONSITE].includes(eventType) && isOnline) {
      throw new InvalidType(eventType)
    }
  }
}
