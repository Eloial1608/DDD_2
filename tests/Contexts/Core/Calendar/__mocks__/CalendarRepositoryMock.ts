import { Calendar } from '@Core/Calendar/domain/Calendar'
import { CalendarRepository } from '@Core/Calendar/domain/CalendarRepository'
import { Id } from '@Core/Calendar/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class CalendarRepositoryMock implements CalendarRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<Calendar>
  private expectedSearch: Array<Calendar> = []

  async find (id: Id): Promise<Nullable<Calendar>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (calendar: Nullable<Calendar>): void {
    this.expectedFind = calendar
  }

  returnOnSearch (calendar: Array<Calendar>): void {
    this.expectedSearch = calendar
  }

  async search (criteria: Criteria): Promise<Array<Calendar>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (calendar: Calendar): Promise<void> {
    this.mockPersist(calendar)
  }

  async delete (calendar: Calendar): Promise<void> {
    this.mockDelete(calendar)
  }

  assertPersistHasBeenCalledWith (calendar: Calendar) {
    expect(this.mockPersist).toHaveBeenCalledWith(calendar)
  }

  assertDeleteHasBeenCalledWith (calendar: Calendar) {
    expect(this.mockDelete).toHaveBeenCalledWith(calendar)
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
