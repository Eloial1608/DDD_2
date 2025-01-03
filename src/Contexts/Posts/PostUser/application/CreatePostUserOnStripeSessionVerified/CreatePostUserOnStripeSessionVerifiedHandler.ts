import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { StripeSessionVerifiedDomainEvent } from '@Stripe/StripeSession/domain/Events/StripeSessionVerifiedDomainEvent'
import { Creator } from './Creator'
import { Id } from '@Posts/PostUser/domain/ValueObjects/Id'
import { ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'
import { UserId } from '@Posts/PostUser/domain/ValueObjects/UserId'
import { PostId } from '@Posts/PostUser/domain/ValueObjects/PostId'

export class CreatePostUserOnStripeSessionVerifiedHandler implements DomainEventSubscriber<StripeSessionVerifiedDomainEvent> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Array<DomainEventClass> {
    return [StripeSessionVerifiedDomainEvent]
  }

  async on (domainEvent: StripeSessionVerifiedDomainEvent): Promise<void> {
    if (domainEvent.product.type !== ProductTypes.POSTS) return

    await this.creator.run(
      new Id(domainEvent.id),
      new UserId(domainEvent.customerId),
      new PostId(domainEvent.product.id)
    )
  }
}
