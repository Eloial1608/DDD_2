import { TicketUpdatedDomainEvent } from '@Events/Ticket/domain/Events/TicketUpdatedDomainEvent'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Id } from '@Stripe/StripeProduct/domain/ValueObjects/Id'
import { Name } from '@Stripe/StripeProduct/domain/ValueObjects/Name'
import { AccountId } from '@Stripe/StripeProduct/domain/ValueObjects/AccountId'
import { ProductType, ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'
import { ProductId } from '@Stripe/StripeProduct/domain/ValueObjects/ProductId'
import { Price } from '@Stripe/StripeProduct/domain/ValueObjects/Price'

export class UpdateStripeProductOnTicketUpdatedHandler implements DomainEventSubscriber<TicketUpdatedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [TicketUpdatedDomainEvent]
  }

  async on (domainEvent: TicketUpdatedDomainEvent): Promise<void> {
    await this.updater.run({
      id: new Id(domainEvent.id),
      name: new Name(domainEvent.title),
      accountId: new AccountId(domainEvent.communityId),
      productType: new ProductType(ProductTypes.EVENTS),
      productId: new ProductId(domainEvent.id),
      price: new Price(String(domainEvent.price?.value ?? 0))
    })
  }
}
