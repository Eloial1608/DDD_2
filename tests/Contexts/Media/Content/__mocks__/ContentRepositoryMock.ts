import { Content } from '@Media/Content/domain/Content'
import { ContentRepository } from '@Media/Content/domain/ContentRepository'
import { Id } from '@Media/Content/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class ContentRepositoryMock implements ContentRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<Content>
  private expectedSearch: Array<Content> = []

  async find (id: Id): Promise<Nullable<Content>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (content: Nullable<Content>): void {
    this.expectedFind = content
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  async search (criteria: Criteria): Promise<Array<Content>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  returnOnSearch (content: Array<Content>): void {
    this.expectedSearch = content
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }

  async persist (content: Content): Promise<void> {
    this.mockPersist(content)
  }

  assertPersistHasBeenCalledWith (content: Content) {
    expect(this.mockPersist).toHaveBeenCalledWith(content)
  }

  assertPersistHasNotBeenCalled () {
    expect(this.mockPersist).not.toHaveBeenCalled()
  }

  async delete (content: Content): Promise<void> {
    this.mockDelete(content)
  }

  assertDeleteHasBeenCalledWith (content: Content) {
    expect(this.mockDelete).toHaveBeenCalledWith(content)
  }

  assertDeleteHasNotBeenCalled () {
    expect(this.mockDelete).not.toHaveBeenCalled()
  }
}
