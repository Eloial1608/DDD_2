import { Status } from '@Projects/Status/domain/Status'
import { StatusRepository } from '@Projects/Status/domain/StatusRepository'
import { Id } from '@Projects/Status/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class StatusRepositoryMock implements StatusRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<Status>
  private expectedSearch: Array<Status> = []

  async find (id: Id): Promise<Nullable<Status>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (Status: Nullable<Status>): void {
    this.expectedFind = Status
  }

  returnOnSearch (Status: Array<Status>): void {
    this.expectedSearch = Status
  }

  async search (criteria: Criteria): Promise<Array<Status>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (Status: Status): Promise<void> {
    this.mockPersist(Status)
  }

  async delete (Status: Status): Promise<void> {
    this.mockDelete(Status)
  }

  assertPersistHasBeenCalledWith (Status: Status) {
    expect(this.mockPersist).toHaveBeenCalledWith(Status)
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
