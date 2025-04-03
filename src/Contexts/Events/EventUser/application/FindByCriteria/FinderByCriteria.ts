import { EventUserRepository } from '@Events/EventUser/domain/EventUserRepository'
import { EventUser } from '@Events/EventUser/domain/EventUser'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: EventUserRepository) {}

  async find (criteria: Criteria): Promise<Array<EventUser>> {
    return await this.repository.search(criteria)
  }
}
