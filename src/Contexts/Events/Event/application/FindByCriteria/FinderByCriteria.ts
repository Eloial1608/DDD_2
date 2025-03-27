import { EventRepository } from '@Events/Event/domain/EventRepository'
import { Event } from '@Events/Event/domain/Event'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: EventRepository) {}

  async find (criteria: Criteria): Promise<Array<Event>> {
    return await this.repository.search(criteria)
  }
}
