import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { User } from '../User'

type UserRegisterDataUpdatedDomainEventBody = {
    readonly id: string
    readonly registerData: object
}

export class UserRegisterDataUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.user.v1.register-data-updated'

  readonly id: string
  readonly registerData: object

  static {
    DomainEvent.derived.add(UserRegisterDataUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: UserRegisterDataUpdatedDomainEventBody & {eventId?: string, occurredOn?: Date}) {
    super(UserRegisterDataUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)
    this.id = params.id
    this.registerData = params.registerData
  }

  static fromAggregate (user:User): UserRegisterDataUpdatedDomainEvent {
    return new UserRegisterDataUpdatedDomainEvent({
      id: user.id.valueOf(),
      registerData: user.registerData!.valueOf()
    })
  }

  toPrimitive (): UserRegisterDataUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: UserRegisterDataUpdatedDomainEventBody, eventId: string, occurredOn: Date): UserRegisterDataUpdatedDomainEvent {
    return new UserRegisterDataUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
