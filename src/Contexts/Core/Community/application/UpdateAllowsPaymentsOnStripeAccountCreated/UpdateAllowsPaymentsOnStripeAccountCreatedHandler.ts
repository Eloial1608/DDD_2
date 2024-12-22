import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { StripeAccountCreatedDomainEvent } from '@Stripe/StripeAccount/domain/Events/StripeAccountCreatedDomainEvent'

export class UpdateAllowsPaymentsOnStripeAccountCreatedHandler implements DomainEventSubscriber<StripeAccountCreatedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [StripeAccountCreatedDomainEvent]
  }

  async on (domainEvent: StripeAccountCreatedDomainEvent): Promise<void> {
    await this.updater.run(
      new Id(domainEvent.id)
    )
  }
}
