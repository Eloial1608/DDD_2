import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { StripeSessionVerifiedDomainEvent } from '@Stripe/StripeSession/domain/Events/StripeSessionVerifiedDomainEvent'
import { Creator } from './Creator'
import { Id } from '@Events/EventUser/domain/ValueObjects/Id'
import { ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'
import { UserId } from '@Events/EventUser/domain/ValueObjects/UserId'
import { TicketId } from '@Events/EventUser/domain/ValueObjects/TicketId'

export class CreateEventUserOnStripeSessionVerifiedHandler implements DomainEventSubscriber<StripeSessionVerifiedDomainEvent> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Array<DomainEventClass> {
    return [StripeSessionVerifiedDomainEvent]
  }

  async on (domainEvent: StripeSessionVerifiedDomainEvent): Promise<void> {
    if (domainEvent.product.type !== ProductTypes.EVENTS) return

    await this.creator.run(
      new Id(domainEvent.id),
      new UserId(domainEvent.customerId),
      new TicketId(domainEvent.product.id)
    )
  }
}
