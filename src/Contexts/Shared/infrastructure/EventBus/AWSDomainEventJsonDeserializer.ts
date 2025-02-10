import { DomainEvent } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventMapping } from './DomainEventMapping'

export class AWSDomainEventJsonDeserializer {
  private mapping: DomainEventMapping

  constructor (mapping: DomainEventMapping) {
    this.mapping = mapping
  }

  deserialize (event?: string): DomainEvent | void {
    if (!event) return

    const parsedEvent = JSON.parse(event)
    const eventAttributes:Record<string, any> = parsedEvent.MessageAttributes
    const eventData:Record<string, any> = JSON.parse(parsedEvent.Message)
    const eventName = eventAttributes.type?.Value

    if (!eventName) {
      console.error('The deserialized event does not contain a name')
      console.error(event)
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
