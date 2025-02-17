import { EventBus } from '@Shared/domain/EventBus/EventBus'
import DI from './dependencyInjection/DI'
import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { Definition } from 'node-dependency-injection'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { DomainEventMapping } from '@Shared/infrastructure/EventBus/DomainEventMapping'

export class Worker {
  async start () {
    const eventBus = DI.getInstance().resolve('Shared.EventBus') as EventBus
    const subscriberDefinitions = DI.getInstance().getContainer().findTaggedServiceIds('domainEventSubscriber') as Map<String, Definition>

    console.log('Subscribers: ')
    const subscribers = [...subscriberDefinitions.keys()].map(k => {
      console.log(k)
      return DI.getInstance().getContainer().get<DomainEventSubscriber<DomainEvent>>(k)
    })
    const domainEventMapping = new DomainEventMapping(subscribers)

    eventBus.setDomainEventMapping(domainEventMapping)
    eventBus.addSubscribers(subscribers)
    await eventBus.start()
  }
}
