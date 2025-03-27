import { EventsUser } from '@Events/EventsUser/domain/EventsUser'
import { EventsUserRepository } from '@Events/EventsUser/domain/EventsUserRepository'
import { Id } from '@Events/EventsUser/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class EventsUserRepositoryMock implements EventsUserRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<EventsUser>
  private expectedSearch: Array<EventsUser> = []

  async find (id: Id): Promise<Nullable<EventsUser>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (eventsUser: Nullable<EventsUser>): void {
    this.expectedFind = eventsUser
  }

  returnOnSearch (eventsUser: Array<EventsUser>): void {
    this.expectedSearch = eventsUser
  }

  async search (criteria: Criteria): Promise<Array<EventsUser>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (eventsUser: EventsUser): Promise<void> {
    this.mockPersist(eventsUser)
  }

  assertPersistHasBeenCalledWith (eventsUser: EventsUser) {
    expect(this.mockPersist).toHaveBeenCalledWith(eventsUser)
  }

  async delete (eventsUser: EventsUser): Promise<void> {
    this.mockDelete(eventsUser)
  }

  assertDeleteHasBeenCalledWith (eventsUser: EventsUser) {
    expect(this.mockDelete).toHaveBeenCalledWith(eventsUser)
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
