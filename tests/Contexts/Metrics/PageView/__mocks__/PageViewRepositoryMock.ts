import { PageView } from '@Metrics/PageView/domain/PageView'
import { PageViewRepository } from '@Metrics/PageView/domain/PageViewRepository'
import { Id } from '@Metrics/PageView/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class PageViewRepositoryMock implements PageViewRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<PageView>
  private expectedSearch: Array<PageView> = []

  async find (id: Id): Promise<Nullable<PageView>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (pageview: Nullable<PageView>): void {
    this.expectedFind = pageview
  }

  returnOnSearch (pageview: Array<PageView>): void {
    this.expectedSearch = pageview
  }

  async search (criteria: Criteria): Promise<Array<PageView>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (pageview: PageView): Promise<void> {
    this.mockPersist(pageview)
  }

  assertPersistHasBeenCalledWith (pageview: PageView) {
    expect(this.mockPersist).toHaveBeenCalledWith(pageview)
  }

  assertDeleteHasBeenCalledWith (pageview: PageView) {
    expect(this.mockDelete).toHaveBeenCalledWith(pageview)
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
