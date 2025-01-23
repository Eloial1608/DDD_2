import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { StripeAccount } from '../StripeAccount'

type StripeAccountCreatedDomainEventBody = {
    readonly id: string
    readonly apiKey: string
}

export class StripeAccountCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME: string = 'app.quid.stripe-account.v1.created'

  readonly id: string
  readonly apiKey: string

  static {
    DomainEvent.derived.add(StripeAccountCreatedDomainEvent.EVENT_NAME)
  }

  constructor (params: StripeAccountCreatedDomainEventBody & { eventId?: string, occurredOn?: Date }) {
    super(StripeAccountCreatedDomainEvent.EVENT_NAME, params.id, params.eventId, params.occurredOn)
    this.id = params.id
    this.apiKey = params.apiKey
  }

  static fromAggregate (stripeAccount: StripeAccount): StripeAccountCreatedDomainEvent {
    return new StripeAccountCreatedDomainEvent({
      id: stripeAccount.id.valueOf(),
      apiKey: stripeAccount.apiKey.valueOf()
    })
  }

  toPrimitive (): StripeAccountCreatedDomainEventBody {
    return { ...this }
  }

  static fromPrimitives (id: string, attributes: StripeAccountCreatedDomainEventBody, eventId: string, occurredOn: Date): StripeAccountCreatedDomainEvent {
    return new StripeAccountCreatedDomainEvent({
      ...attributes,
      id,
      eventId,
      occurredOn
    })
  }
}
