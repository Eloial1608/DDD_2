import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { UserPlan } from '../UserPlan'

type UserPlanCreatedDomainEventBody = {
    readonly id: string
    readonly createdAt: Date
    readonly updatedAt: Date
}

export class UserPlanCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.user-plan.v1.created'

  readonly id: string
  readonly createdAt: Date
  readonly updatedAt: Date

  static {
    DomainEvent.derived.add(UserPlanCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: UserPlanCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(UserPlanCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
  }

  static fromAggregate (userPlan: UserPlan): UserPlanCreatedDomainEvent {
    return new UserPlanCreatedDomainEvent({
      id: userPlan.id.valueOf(),
      createdAt: userPlan.createdAt.valueOf(),
      updatedAt: userPlan.updatedAt.valueOf()

    })
  }

  toPrimitive (): UserPlanCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: UserPlanCreatedDomainEventBody, eventId: string, occurredOn: Date): UserPlanCreatedDomainEvent {
    return new UserPlanCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
