import { DomainEvent } from './EventBus/DomainEvent'

export abstract class AggregateRoot {
  private domainEvents: Array<DomainEvent>

  constructor () {
    this.domainEvents = []
  }

  pullDomainEvents (): Array<DomainEvent> {
    const domainEvents = this.domainEvents.slice()
    this.domainEvents = []

    return domainEvents
  }

  record (event: DomainEvent | DomainEvent[]): void {
    if (Array.isArray(event)) this.domainEvents.push(...event)
    else this.domainEvents.push(event)
  }
}
