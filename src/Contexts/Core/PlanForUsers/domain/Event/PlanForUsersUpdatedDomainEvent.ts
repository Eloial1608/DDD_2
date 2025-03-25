import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Nullable } from '@Shared/domain/Nullable'
import { PlanForUsers } from '../PlanForUsers'

type PlanForUsersUpdatedDomainEventBody = {
  readonly id: string,
  readonly name: string,
  readonly description: Nullable<string>,
  readonly communityId: string,
  readonly priceValue: number,
  readonly priceCurrency: string,
  readonly renovationInterval: number,
  readonly renovationType: string,
  readonly createdAt: Date,
  readonly updatedAt: Date
}

export class PlanForUsersUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.gathered.plan-for-users.v1.updated'

  readonly id: string
  readonly name: string
  readonly description: Nullable<string>
  readonly communityId: string
  readonly priceValue: number
  readonly priceCurrency: string
  readonly renovationInterval: number
  readonly renovationType: string
  readonly createdAt: Date
  readonly updatedAt: Date

  static {
    DomainEvent.derived.add(PlanForUsersUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: PlanForUsersUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(PlanForUsersUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.name = params.name
    this.description = params.description
    this.communityId = params.communityId
    this.priceValue = params.priceValue
    this.priceCurrency = params.priceCurrency
    this.renovationInterval = params.renovationInterval
    this.renovationType = params.renovationType
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
  }

  static fromAggregate (planForUsers: PlanForUsers): PlanForUsersUpdatedDomainEvent {
    return new PlanForUsersUpdatedDomainEvent({
      id: planForUsers.id.valueOf(),
      name: planForUsers.name.valueOf(),
      description: planForUsers.description?.valueOf(),
      communityId: planForUsers.communityId.valueOf(),
      priceValue: planForUsers.price.value.valueOf(),
      priceCurrency: planForUsers.price.currency.valueOf(),
      renovationInterval: planForUsers.renovationInterval.valueOf(),
      renovationType: planForUsers.renovationType.valueOf(),
      createdAt: planForUsers.createdAt.valueOf(),
      updatedAt: planForUsers.updatedAt.valueOf()
    })
  }

  toPrimitive (): PlanForUsersUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: PlanForUsersUpdatedDomainEventBody, eventId: string, occurredOn: Date): PlanForUsersUpdatedDomainEvent {
    return new PlanForUsersUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
