import { EventBus } from '@Shared/domain/EventBus/EventBus'
import DI from './dependencyInjection/DI'
import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { DomainEventMapping } from '@Shared/infrastructure/EventBus/DomainEventMapping'

export class Worker {
  async start () {
    const eventBus = DI.getInstance().resolve('Shared.EventBus') as EventBus
    const subscriberDefinitions = DI.getInstance().getContainer().findTaggedServiceIds('domainEventSubscriber')

    console.log('Subscribers: ')

    const subscribers = [...subscriberDefinitions].map(k => {
      console.log(k.id)
      return DI.getInstance().resolve<DomainEventSubscriber<DomainEvent>>(k.id)
    })
    const domainEventMapping = new DomainEventMapping(subscribers)

    eventBus.setDomainEventMapping(domainEventMapping)
    eventBus.addSubscribers(subscribers)
    await eventBus.start()
  }
}
