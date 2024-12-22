import { CalendarRepository } from '@Core/Calendar/domain/CalendarRepository'
import { Id } from '@Core/Calendar/domain/ValueObjects/Id'
import { Calendar } from '@Core/Calendar/domain/Calendar'
import { CalendarNotFound } from '@Core/Calendar/domain/Errors/CalendarNotFound'

export class FinderById {
  constructor (private readonly repository: CalendarRepository) {}

  async find (id: Id): Promise<Calendar> {
    const calendar = await this.repository.find(id)

    if (!calendar) throw new CalendarNotFound(id)

    return calendar
  }
}
