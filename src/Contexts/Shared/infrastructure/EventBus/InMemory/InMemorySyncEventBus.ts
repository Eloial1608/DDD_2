import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { DomainEventMapping } from '@Shared/infrastructure/EventBus/DomainEventMapping'

type Subscription = {
  boundedCallback: Function;
  originalCallback: Function;
};

export class InMemorySyncEventBus implements EventBus {
  private subscriptions: Map<string, Array<Subscription>>

  constructor () {
    this.subscriptions = new Map()
  }

  async start (): Promise<void> {}

  async startPublisher (): Promise<void> {}

  async publish (events: Array<DomainEvent>): Promise<void> {
    const executions: any = []
    events.forEach(event => {
      const subscribers = this.subscriptions.get(event.eventName)
      if (subscribers) {
        subscribers.map(subscriber => executions.push(subscriber.boundedCallback(event)))
      }
    })

    await Promise.all(executions)
  }

  addSubscribers (subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
    subscribers.map(subscriber =>
      subscriber.subscribedTo().map(event => this.subscribe(event.EVENT_NAME!, subscriber))
    )
  }

  setDomainEventMapping (domainEventMapping: DomainEventMapping): void {}

  private subscribe (topic: string, subscriber: DomainEventSubscriber<DomainEvent>): void {
    const currentSubscriptions = this.subscriptions.get(topic)
    const subscription = { boundedCallback: subscriber.on.bind(subscriber), originalCallback: subscriber.on }
    if (currentSubscriptions) {
      currentSubscriptions.push(subscription)
    } else {
      this.subscriptions.set(topic, [subscription])
    }
  }
}
