import { EventUser } from '@Events/EventUser/domain/EventUser'
import { EventUserRepository } from '@Events/EventUser/domain/EventUserRepository'
import { Id } from '@Events/EventUser/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class EventUserRepositoryMock implements EventUserRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<EventUser>
  private expectedSearch: Array<EventUser> = []

  async find (id: Id): Promise<Nullable<EventUser>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (eventUser: Nullable<EventUser>): void {
    this.expectedFind = eventUser
  }

  returnOnSearch (eventUser: Array<EventUser>): void {
    this.expectedSearch = eventUser
  }

  async search (criteria: Criteria): Promise<Array<EventUser>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (eventUser: EventUser): Promise<void> {
    this.mockPersist(eventUser)
  }

  assertPersistHasBeenCalledWith (eventUser: EventUser) {
    expect(this.mockPersist).toHaveBeenCalledWith(eventUser)
  }

  async delete (eventUser: EventUser): Promise<void> {
    this.mockDelete(eventUser)
  }

  assertDeleteHasBeenCalledWith (eventUser: EventUser) {
    expect(this.mockDelete).toHaveBeenCalledWith(eventUser)
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
