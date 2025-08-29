import { Title } from '@Core/Title/domain/Title'
import { TitleRepository } from '@Core/Title/domain/TitleRepository'
import { Id } from '@Core/Title/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class TitleRepositoryMock implements TitleRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()

  private expectedFind: Nullable<Title>
  private expectedSearch: Array<Title> = []

  async find (id: Id): Promise<Nullable<Title>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (title: Nullable<Title>): void {
    this.expectedFind = title
  }

  returnOnSearch (title: Array<Title>): void {
    this.expectedSearch = title
  }

  async search (criteria: Criteria): Promise<Array<Title>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (title: Title): Promise<void> {
    this.mockPersist(title)
  }

  assertPersistHasBeenCalledWith (title: Title) {
    expect(this.mockPersist).toHaveBeenCalledWith(title)
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
