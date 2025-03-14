import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { StripeSessionVerifiedDomainEvent } from '@Stripe/StripeSession/domain/Events/StripeSessionVerifiedDomainEvent'
import { Creator } from './Creator'
import { Id } from '@Threads/ThreadUser/domain/ValueObjects/Id'
import { ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'
import { UserId } from '@Threads/ThreadUser/domain/ValueObjects/UserId'
import { ThreadId } from '@Threads/ThreadUser/domain/ValueObjects/ThreadId'

export class CreateThreadUserOnStripeSessionVerifiedHandler implements DomainEventSubscriber<StripeSessionVerifiedDomainEvent> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Array<DomainEventClass> {
    return [StripeSessionVerifiedDomainEvent]
  }

  async on (domainEvent: StripeSessionVerifiedDomainEvent): Promise<void> {
    if (domainEvent.product.type !== ProductTypes.THREADS) return

    await this.creator.run(
      new Id(domainEvent.id),
      new UserId(domainEvent.customerId),
      new ThreadId(domainEvent.product.id)
    )
  }
}
