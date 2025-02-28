import { PostUpdatedDomainEvent } from '@Posts/Post/domain/Events/PostUpdatedDomainEvent'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Id } from '@Stripe/StripeProduct/domain/ValueObjects/Id'
import { Name } from '@Stripe/StripeProduct/domain/ValueObjects/Name'
import { AccountId } from '@Stripe/StripeProduct/domain/ValueObjects/AccountId'
import { ProductType, ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'
import { ProductId } from '@Stripe/StripeProduct/domain/ValueObjects/ProductId'
import { Price } from '@Stripe/StripeProduct/domain/ValueObjects/Price'

export class UpdateStripeProductOnPostUpdatedHandler implements DomainEventSubscriber<PostUpdatedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [PostUpdatedDomainEvent]
  }

  async on (domainEvent: PostUpdatedDomainEvent): Promise<void> {
    if (!domainEvent.isPaid || domainEvent.price?.value == null) return

    await this.updater.run({
      id: new Id(domainEvent.id),
      name: new Name(domainEvent.title),
      accountId: new AccountId(domainEvent.communityId),
      productType: new ProductType(ProductTypes.POSTS),
      productId: new ProductId(domainEvent.id),
      price: new Price(String(domainEvent.price?.value ?? 0))
    })
  }
}
