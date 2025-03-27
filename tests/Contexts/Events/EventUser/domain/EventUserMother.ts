import { EventsUser } from '@Events/EventsUser/domain/EventsUser'
import { CreatedAt } from '@Events/EventsUser/domain/ValueObjects/CreatedAt'
import { Id } from '@Events/EventsUser/domain/ValueObjects/Id'
import { EventId } from '@Events/EventsUser/domain/ValueObjects/EventId'
import { UserId } from '@Events/EventsUser/domain/ValueObjects/UserId'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'

export class EventsUserMother {
  static create (params: Partial<EventsUser>): EventsUser {
    return new EventsUser(
      params.id ?? new Id(UuidMother.random()),
      params.userId ?? new UserId(UuidMother.random()),
      params.eventId ?? new EventId(UuidMother.random()),
      params.createdAt ?? new CreatedAt(new Date())
    )
  }

  static random (): EventsUser {
    return this.create({})
  }
}
