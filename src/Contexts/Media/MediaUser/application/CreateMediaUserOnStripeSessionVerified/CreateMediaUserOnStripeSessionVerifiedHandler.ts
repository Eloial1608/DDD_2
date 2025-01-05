import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { StripeSessionVerifiedDomainEvent } from '@Stripe/StripeSession/domain/Events/StripeSessionVerifiedDomainEvent'
import { Creator } from './Creator'
import { Id } from '@Media/MediaUser/domain/ValueObjects/Id'
import { ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'
import { UserId } from '@Media/MediaUser/domain/ValueObjects/UserId'
import { MediaId } from '@Media/MediaUser/domain/ValueObjects/MediaId'

export class CreateMediaUserOnStripeSessionVerifiedHandler implements DomainEventSubscriber<StripeSessionVerifiedDomainEvent> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Array<DomainEventClass> {
    return [StripeSessionVerifiedDomainEvent]
  }

  async on (domainEvent: StripeSessionVerifiedDomainEvent): Promise<void> {
    if (domainEvent.product.type !== ProductTypes.MEDIA) return

    await this.creator.run(
      new Id(domainEvent.id),
      new UserId(domainEvent.customerId),
      new MediaId(domainEvent.product.id)
    )
  }
}
