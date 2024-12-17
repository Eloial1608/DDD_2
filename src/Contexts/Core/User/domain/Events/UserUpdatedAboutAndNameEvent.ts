import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Nullable } from '@Shared/domain/Nullable'
import { User } from '../User'

type UserUpdatedAboutAndNameDomainEventBody = {
    readonly id: string
    readonly about: Nullable<string>
    readonly name: string
    readonly communityId:string
}

export class UserUpdatedAboutAndNameDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.user.v1.about-and-name-updated'

  readonly id: string
  readonly about: Nullable<string>
  readonly name: string
  readonly communityId: string

  static {
    DomainEvent.derived.add(UserUpdatedAboutAndNameDomainEvent.EVENT_NAME)
  }

  constructor(params: UserUpdatedAboutAndNameDomainEventBody & {eventId?: string, occurredOn?: Date}) {
    super(UserUpdatedAboutAndNameDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)
    this.id = params.id
    this.about = params.about
    this.name = params.name
    this.communityId = params.communityId
  }

  static fromAggregate (user:User): UserUpdatedAboutAndNameDomainEvent {
    return new UserUpdatedAboutAndNameDomainEvent({
      id: user.id.valueOf(),
      about: user.about?.valueOf(),
      name: user.name.valueOf(),
      communityId: user.communityId.valueOf()
    })
  }

  toPrimitive (): UserUpdatedAboutAndNameDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: UserUpdatedAboutAndNameDomainEventBody, eventId: string, occurredOn: Date): UserUpdatedIsAdminDomainEvent {
    return new UserUpdatedAboutAndNameDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}