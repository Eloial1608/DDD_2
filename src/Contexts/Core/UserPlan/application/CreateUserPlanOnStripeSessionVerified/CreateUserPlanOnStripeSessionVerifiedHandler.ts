import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { StripeSessionVerifiedDomainEvent } from '@Stripe/StripeSession/domain/Events/StripeSessionVerifiedDomainEvent'
import { Creator } from './Creator'
import { Id } from '@Core/UserPlan/domain/ValueObjects/Id'
import { Name } from '@Core/UserPlan/domain/ValueObjects/Name'
import { PlanId } from '@Core/UserPlan/domain/ValueObjects/PlanId'
import { Price, PriceCurrency, PriceValue } from '@Core/UserPlan/domain/ValueObjects/Price'
import { RenovationInterval } from '@Core/UserPlan/domain/ValueObjects/RenovationInterval'
import { RenovationType } from '@Core/UserPlan/domain/ValueObjects/RenovationType'
import { RenovationTypeValues } from '@Shared/domain/SharedValueObjects/SharedRenovationType'
import { ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'

export class CreateUserPlanOnStripeSessionVerifiedHandler implements DomainEventSubscriber<StripeSessionVerifiedDomainEvent> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Array<DomainEventClass> {
    return [StripeSessionVerifiedDomainEvent]
  }

  async on (domainEvent: StripeSessionVerifiedDomainEvent): Promise<void> {
    if (domainEvent.product.type !== ProductTypes.USER_PLANS) return

    await this.creator.run(
      new Id(domainEvent.customerId),
      new Name(domainEvent.product.name),
      new PlanId(domainEvent.product.id),
      new Price(new PriceValue(Number(domainEvent.price)), new PriceCurrency('€')),
      new RenovationInterval(domainEvent.product.renovationInterval!),
      new RenovationType(domainEvent.product.renovationType! as RenovationTypeValues)
    )
  }
}
