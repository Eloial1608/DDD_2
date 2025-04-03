import { Event } from '@Events/Event/domain/Event'
import { EventRepository } from '@Events/Event/domain/EventRepository'
import { Id } from '@Events/Event/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class EventRepositoryMock implements EventRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<Event>
  private expectedSearch: Array<Event> = []

  async find (id: Id): Promise<Nullable<Event>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (event: Nullable<Event>): void {
    this.expectedFind = event
  }

  returnOnSearch (event: Array<Event>): void {
    this.expectedSearch = event
  }

  async search (criteria: Criteria): Promise<Array<Event>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (event: Event): Promise<void> {
    this.mockPersist(event)
  }

  assertPersistHasBeenCalledWith (event: Event) {
    expect(this.mockPersist).toHaveBeenCalledWith(event)
  }

  async delete (event: Event): Promise<void> {
    this.mockDelete(event)
  }

  assertDeleteHasBeenCalledWith (event: Event) {
    expect(this.mockDelete).toHaveBeenCalledWith(event)
  }

  assertDeleteHasNotBeenCalled () {
    expect(this.mockDelete).not.toHaveBeenCalled()
  }

  assertPersistHasNotBeenCalled () {
    expect(this.mockPersist).not.toHaveBeenCalled()
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
