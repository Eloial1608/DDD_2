import { SpaceCreatedDomainEvent } from '@Core/Space/domain/Events/SpaceCreatedDomainEvent'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Creator } from './Creator'
import { Id } from '@Stripe/StripeProduct/domain/ValueObjects/Id'
import { Name } from '@Stripe/StripeProduct/domain/ValueObjects/Name'
import { AccountId } from '@Stripe/StripeProduct/domain/ValueObjects/AccountId'
import { ProductType, ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'
import { ProductId } from '@Stripe/StripeProduct/domain/ValueObjects/ProductId'
import { Price } from '@Stripe/StripeProduct/domain/ValueObjects/Price'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'

export class CreateStripeProductOnSpaceCreatedHandler implements DomainEventSubscriber<SpaceCreatedDomainEvent> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Array<DomainEventClass> {
    return [SpaceCreatedDomainEvent]
  }

  async on (domainEvent: SpaceCreatedDomainEvent): Promise<void> {
    if (domainEvent.accessibility !== AllowedAccessibilities.PAYMENT || domainEvent.price?.value == null) return

    await this.creator.run({
      id: new Id(domainEvent.id),
      name: new Name(domainEvent.name),
      accountId: new AccountId(domainEvent.communityId),
      productType: new ProductType(ProductTypes.SPACE),
      productId: new ProductId(domainEvent.id),
      price: new Price(String(domainEvent.price?.value ?? 0))
    })
  }
}
