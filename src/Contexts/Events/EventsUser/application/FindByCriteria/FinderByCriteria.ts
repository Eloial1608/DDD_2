import { EventsUserRepository } from '@Events/EventsUser/domain/EventsUserRepository'
import { EventsUser } from '@Events/EventsUser/domain/EventsUser'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: EventsUserRepository) {}

  async find (criteria: Criteria): Promise<Array<EventsUser>> {
    return await this.repository.search(criteria)
  }
}
