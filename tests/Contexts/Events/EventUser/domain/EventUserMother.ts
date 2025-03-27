import { EventUser } from '@Events/EventUser/domain/EventUser'
import { CreatedAt } from '@Events/EventUser/domain/ValueObjects/CreatedAt'
import { Id } from '@Events/EventUser/domain/ValueObjects/Id'
import { EventId } from '@Events/EventUser/domain/ValueObjects/EventId'
import { UserId } from '@Events/EventUser/domain/ValueObjects/UserId'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { IsOnline } from '@Events/EventUser/domain/ValueObjects/IsOnline'
import { IsOnSite } from '@Events/EventUser/domain/ValueObjects/IsOnSite'
import { TicketId } from '@Events/EventUser/domain/ValueObjects/TicketId'

export class EventUserMother {
  static create (params: Partial<EventUser>): EventUser {
    return new EventUser(
      params.id ?? new Id(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.eventId ?? new EventId(UuidMother.random()),
      params.isOnline ?? new IsOnline(true),
      params.isOnSite ?? new IsOnSite(false),
      params.ticketId ?? new TicketId(UuidMother.random()),
      params.createdAt ?? new CreatedAt(new Date())
    )
  }

  static random (): EventUser {
    return this.create({})
  }
}
