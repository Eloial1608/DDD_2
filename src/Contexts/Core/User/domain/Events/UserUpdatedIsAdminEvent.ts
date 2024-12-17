import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { User } from '../User'

type UserUpdatedIsAdminDomainEventBody = {
    readonly id: string
    readonly isAdmin: boolean
    readonly communityId:string
}

export class UserUpdatedIsAdminDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.user.v1.admin-updated'

  readonly id: string
  readonly isAdmin: boolean
  readonly communityId: string

  static {
    DomainEvent.derived.add(UserUpdatedIsAdminDomainEvent.EVENT_NAME)
  }

  constructor (params: UserUpdatedIsAdminDomainEventBody & {eventId?: string, occurredOn?: Date}) {
    super(UserUpdatedIsAdminDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.isAdmin = params.isAdmin
    this.communityId = params.communityId
  }

  static fromAggregate (user:User): UserUpdatedIsAdminDomainEvent {
    return new UserUpdatedIsAdminDomainEvent({
      id: user.id.valueOf(),
      isAdmin: user.isAdmin.valueOf(),
      communityId: user.communityId.valueOf()
    })
  }

  toPrimitive (): UserUpdatedIsAdminDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: UserUpdatedIsAdminDomainEventBody, eventId: string, occurredOn: Date): UserUpdatedIsAdminDomainEvent {
    return new UserUpdatedIsAdminDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
