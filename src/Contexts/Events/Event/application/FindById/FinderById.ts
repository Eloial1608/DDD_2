import { EventRepository } from '@Events/Event/domain/EventRepository'
import { Id } from '@Events/Event/domain/ValueObjects/Id'
import { Event } from '@Events/Event/domain/Event'
import { EventNotFound } from '@Events/Event/domain/Errors/EventNotFound'

export class FinderById {
  constructor (private readonly repository: EventRepository) {}

  async find (id: Id): Promise<Event> {
    const event = await this.repository.find(id)

    if (!event) throw new EventNotFound(id)

    return event
  }
}
