import { SpaceUpdatedDomainEvent } from '@Core/Space/domain/Events/SpaceUpdatedDomainEvent'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Id } from '@Stripe/StripeProduct/domain/ValueObjects/Id'
import { Name } from '@Stripe/StripeProduct/domain/ValueObjects/Name'
import { AccountId } from '@Stripe/StripeProduct/domain/ValueObjects/AccountId'
import { ProductType, ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'
import { ProductId } from '@Stripe/StripeProduct/domain/ValueObjects/ProductId'
import { Price } from '@Stripe/StripeProduct/domain/ValueObjects/Price'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'

export class UpdateStripeProductOnSpaceUpdatedHandler implements DomainEventSubscriber<SpaceUpdatedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [SpaceUpdatedDomainEvent]
  }

  async on (domainEvent: SpaceUpdatedDomainEvent): Promise<void> {
    if (domainEvent.accessibility !== AllowedAccessibilities.PAYMENT || domainEvent.price?.value == null) return

    await this.updater.run({
      id: new Id(domainEvent.id),
      name: new Name(domainEvent.name),
      accountId: new AccountId(domainEvent.communityId),
      productType: new ProductType(ProductTypes.SPACE),
      productId: new ProductId(domainEvent.id),
      price: new Price(String(domainEvent.price?.value ?? 0))
    })
  }
}
