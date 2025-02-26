import { PlanForUsersCreatedDomainEvent } from '@Core/PlanForUsers/domain/Event/PlanForUsersCreatedDomainEvent'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Creator } from './Creator'
import { Id } from '@Stripe/StripeProduct/domain/ValueObjects/Id'
import { Name } from '@Stripe/StripeProduct/domain/ValueObjects/Name'
import { AccountId } from '@Stripe/StripeProduct/domain/ValueObjects/AccountId'
import { ProductType, ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'
import { ProductId } from '@Stripe/StripeProduct/domain/ValueObjects/ProductId'
import { Price } from '@Stripe/StripeProduct/domain/ValueObjects/Price'
import { RenovationInterval } from '@Stripe/StripeProduct/domain/ValueObjects/RenovationInterval'
import { RenovationType } from '@Stripe/StripeProduct/domain/ValueObjects/RenovationType'
import { RenovationTypeValues } from '@Shared/domain/SharedValueObjects/SharedRenovationType'

export class CreateStripeProductOnPlanForUsersCreatedHandler implements DomainEventSubscriber<PlanForUsersCreatedDomainEvent> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Array<DomainEventClass> {
    return [PlanForUsersCreatedDomainEvent]
  }

  async on (domainEvent: PlanForUsersCreatedDomainEvent): Promise<void> {
    await this.creator.run({
      id: new Id(domainEvent.id),
      name: new Name(domainEvent.name),
      accountId: new AccountId(domainEvent.communityId),
      productType: new ProductType(ProductTypes.USER_PLANS),
      productId: new ProductId(domainEvent.id),
      price: new Price(String(domainEvent.priceValue ?? 0)),
      renovationInterval: new RenovationInterval(domainEvent.renovationInterval),
      renovationType: new RenovationType(domainEvent.renovationType as RenovationTypeValues)
    })
  }
}
