import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { EventEmitterBus } from '@Shared/infrastructure/EventBus/EventEmitterBus'
import { DomainEventMapping } from '../DomainEventMapping'

export class InMemoryAsyncEventBus implements EventBus {
  private bus: EventEmitterBus

  constructor (subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    this.bus = new EventEmitterBus(subscribers)
  }

  async startPublisher (): Promise<void> {}

  async start (): Promise<void> {}

  async publish (events: DomainEvent[]): Promise<void> {
    this.bus.publish(events)
  }

  addSubscribers (subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    this.bus.registerSubscribers(subscribers)
  }

  setDomainEventMapping (domainEventMapping: DomainEventMapping): void {}
}
