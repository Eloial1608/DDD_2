import { DomainEvent } from '@Shared/domain/DomainEvent'
import { DomainEventMapping } from './DomainEventMapping'

export class RabbitMQDomainEventJsonDeserializer {
  private mapping: DomainEventMapping

  constructor (mapping: DomainEventMapping) {
    this.mapping = mapping
  }

  deserialize (event?: string): DomainEvent | void {
    if (!event) {
      return
    }

    const eventAttributes:Record<string, any> = JSON.parse(event).MessageAttributes
    const eventData:Record<string, any> = JSON.parse(JSON.parse(event).Message)
    const eventName = eventAttributes.type?.StringValue

    this.mapping.for(eventName)

    if (!eventName) {
      return
    }
    const eventClass = this.mapping.for(eventName)
    if (!eventClass) {
      return
    }

    return eventClass.fromPrimitives(
      eventAttributes.aggregateId.Value,
      eventData,
      eventAttributes.id.Value,
      eventAttributes.occurred_on.Value
    )
  }
}
