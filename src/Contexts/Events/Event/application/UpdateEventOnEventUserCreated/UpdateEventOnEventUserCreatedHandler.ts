import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { EventUserCreatedDomainEvent } from '@Events/EventUser/domain/Events/EventUserCreatedDomainEvent'
import { Id } from '@Events/Event/domain/ValueObjects/Id'
import { Accessibility, EventAccessibilities } from '@Events/Event/domain/ValueObjects/Accessibility'

export class UpdateEventOnEventUserCreatedHandler implements DomainEventSubscriber <EventUserCreatedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [EventUserCreatedDomainEvent]
  }

  async on (domainEvent: EventUserCreatedDomainEvent): Promise<void> {
    const types = []

    if (domainEvent.isOnSite) types.push(new Accessibility(EventAccessibilities.ONSITE))
    if (domainEvent.isOnline) types.push(new Accessibility(EventAccessibilities.ONLINE))

    await this.updater.run(
      new Id(domainEvent.eventId),
      types
    )
  }
}
