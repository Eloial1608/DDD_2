import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { TicketCreatedDomainEvent } from './Events/TicketCreatedDomainEvent'
import { TicketDeletedDomainEvent } from './Events/TicketDeletedDomainEvent'
import { TicketUpdatedDomainEvent } from './Events/TicketUpdatedDomainEvent'
import { EventId } from './ValueObjects/EventId'
import { Title } from './ValueObjects/Title'
import { Nullable } from '@Shared/domain/Nullable'
import { Description } from './ValueObjects/Description'
import { Price } from './ValueObjects/Price'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { IsOnline } from './ValueObjects/IsOnline'
import { IsOnSite } from './ValueObjects/IsOnSite'

export class Ticket extends AggregateRoot {
  constructor (
    readonly id: Id,
    readonly eventId: EventId,
    readonly title: Title,
    readonly description: Nullable<Description>,
    readonly price: Price,
    readonly isOnline: IsOnline,
    readonly isOnSite: IsOnSite,
    readonly createdAt: CreatedAt,
    readonly updatedAt: UpdatedAt,
    readonly deletedAt: Nullable<DeletedAt>
  ) {
    super()
  }

  static create (
    id: Id,
    eventId: EventId,
    title: Title,
    description: Nullable<Description>,
    price: Price,
    isOnline: IsOnline,
    isOnSite: IsOnSite
  ): Ticket {
    const ticket = new Ticket(
      id,
      eventId,
      title,
      description,
      price,
      isOnline,
      isOnSite,
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
      null
    )

    ticket.record(TicketCreatedDomainEvent.fromAggregate(ticket))

    return ticket
  }

  update (
    title: Title,
    description: Nullable<Description>,
    price: Price
  ): Ticket {
    const ticket = new Ticket(
      this.id,
      this.eventId,
      title,
      description,
      price,
      this.isOnline,
      this.isOnSite,
      this.createdAt,
      new UpdatedAt(new Date()),
      null
    )

    ticket.record(TicketUpdatedDomainEvent.fromAggregate(ticket))

    return ticket
  }

  delete (): Ticket {
    const ticket = new Ticket(
      this.id,
      this.eventId,
      this.title,
      this.description,
      this.price,
      this.isOnline,
      this.isOnSite,
      this.createdAt,
      this.updatedAt,
      new DeletedAt(new Date())
    )

    ticket.record(TicketDeletedDomainEvent.fromAggregate(ticket))

    return ticket
  }
}
