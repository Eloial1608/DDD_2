import { PostCreatedDomainEvent } from '@Posts/Post/domain/Events/PostCreatedDomainEvent'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Creator } from './Creator'
import { Id } from '@Stripe/StripeProduct/domain/ValueObjects/Id'
import { Name } from '@Stripe/StripeProduct/domain/ValueObjects/Name'
import { AccountId } from '@Stripe/StripeProduct/domain/ValueObjects/AccountId'
import { ProductType, ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'
import { ProductId } from '@Stripe/StripeProduct/domain/ValueObjects/ProductId'
import { Price } from '@Stripe/StripeProduct/domain/ValueObjects/Price'

export class CreateStripeProductOnPostCreatedHandler implements DomainEventSubscriber<PostCreatedDomainEvent> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Array<DomainEventClass> {
    return [PostCreatedDomainEvent]
  }

  async on (domainEvent: PostCreatedDomainEvent): Promise<void> {
    if (!domainEvent.isPaid || domainEvent.price?.value == null) return

    await this.creator.run({
      id: new Id(domainEvent.id),
      name: new Name(domainEvent.title),
      accountId: new AccountId(domainEvent.communityId),
      productType: new ProductType(ProductTypes.POSTS),
      productId: new ProductId(domainEvent.id),
      price: new Price(String(domainEvent.price?.value ?? 0))
    })
  }
}
