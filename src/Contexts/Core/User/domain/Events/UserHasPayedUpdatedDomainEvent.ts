import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Nullable } from '@Shared/domain/Nullable'
import { User } from '../User'

type UserHasPayedUpdatedDomainEventBody = {
    readonly id: string
    readonly about: Nullable<string>
    readonly name: string
}

export class UserHasPayedUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.user.v1.has-payed-updated'

  readonly id: string
  readonly about: Nullable<string>
  readonly name: string

  static {
    DomainEvent.derived.add(UserHasPayedUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: UserHasPayedUpdatedDomainEventBody & {eventId?: string, occurredOn?: Date}) {
    super(UserHasPayedUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)
    this.id = params.id
    this.about = params.about
    this.name = params.name
  }

  static fromAggregate (user:User): UserHasPayedUpdatedDomainEvent {
    return new UserHasPayedUpdatedDomainEvent({
      id: user.id.valueOf(),
      about: user.about?.valueOf(),
      name: user.name.valueOf()
    })
  }

  toPrimitive (): UserHasPayedUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: UserHasPayedUpdatedDomainEventBody, eventId: string, occurredOn: Date): UserHasPayedUpdatedDomainEvent {
    return new UserHasPayedUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
