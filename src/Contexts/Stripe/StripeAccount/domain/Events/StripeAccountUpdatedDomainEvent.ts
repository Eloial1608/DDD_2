import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { StripeAccount } from '../StripeAccount'

type StripeAccountUpdatedDomainEventBody = {
    readonly id: string
    readonly apiKey: string
}

export class StripeAccountUpdatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.stripe-account.v1.updated'

  readonly id: string
  readonly apiKey: string

  static {
    DomainEvent.derived.add(StripeAccountUpdatedDomainEvent.EVENT_NAME)
  }

  constructor (params: StripeAccountUpdatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(StripeAccountUpdatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)

    this.id = params.id
    this.apiKey = params.apiKey
  }

  static fromAggregate (stripeAccount: StripeAccount): StripeAccountUpdatedDomainEvent {
    return new StripeAccountUpdatedDomainEvent({
      id: stripeAccount.id.valueOf(),
      apiKey: stripeAccount.apiKey.valueOf()

    })
  }

  toPrimitive (): StripeAccountUpdatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: StripeAccountUpdatedDomainEventBody, eventId: string, occurredOn: Date): StripeAccountUpdatedDomainEvent {
    return new StripeAccountUpdatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
