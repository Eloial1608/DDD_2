import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Nullable } from '@Shared/domain/Nullable'
import { User } from '../User'

type UserUpdatedPrincipalTitleDomainEventBody = {
    readonly id: string
    readonly principalTitle: Nullable<string>
}

export class UserUpdatedPrincipalTitleDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.user.v1.principal-title-updated'

  readonly id: string
  readonly principalTitle: Nullable<string>

  static {
    DomainEvent.derived.add(UserUpdatedPrincipalTitleDomainEvent.EVENT_NAME)
  }

  constructor (params: UserUpdatedPrincipalTitleDomainEventBody & {eventId?: string, occurredOn?: Date}) {
    super(UserUpdatedPrincipalTitleDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)
    this.id = params.id
    this.principalTitle = params.principalTitle
  }

  static fromAggregate (user:User): UserUpdatedPrincipalTitleDomainEvent {
    return new UserUpdatedPrincipalTitleDomainEvent({
      id: user.id.valueOf(),
      principalTitle: user.principalTitle?.valueOf()
    })
  }

  toPrimitive (): UserUpdatedPrincipalTitleDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: UserUpdatedPrincipalTitleDomainEventBody, eventId: string, occurredOn: Date): UserUpdatedPrincipalTitleDomainEvent {
    return new UserUpdatedPrincipalTitleDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
