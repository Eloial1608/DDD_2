import { Session } from '@Metrics/Session/domain/Session'
import { SessionRepository } from '@Metrics/Session/domain/SessionRepository'
import { Id } from '@Metrics/Session/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class SessionRepositoryMock implements SessionRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<Session>
  private expectedSearch: Array<Session> = []

  async find (id: Id): Promise<Nullable<Session>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (session: Nullable<Session>): void {
    this.expectedFind = session
  }

  returnOnSearch (session: Array<Session>): void {
    this.expectedSearch = session
  }

  async search (criteria: Criteria): Promise<Array<Session>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (session: Session): Promise<void> {
    this.mockPersist(session)
  }

  assertPersistHasBeenCalledWith (session: Session) {
    expect(this.mockPersist).toHaveBeenCalledWith(session)
  }

  assertDeleteHasBeenCalledWith (session: Session) {
    expect(this.mockDelete).toHaveBeenCalledWith(session)
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
