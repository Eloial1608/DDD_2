import { CalendarRepository } from '@Core/Calendar/domain/CalendarRepository'
import { Calendar } from '@Core/Calendar/domain/Calendar'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: CalendarRepository) {}

  async find (criteria: Criteria): Promise<Array<Calendar>> {
    return await this.repository.search(criteria)
  }
}
