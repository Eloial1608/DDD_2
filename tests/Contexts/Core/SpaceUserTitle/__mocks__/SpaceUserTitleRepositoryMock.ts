import { SpaceUserTitle } from '@Core/SpaceUserTitle/domain/SpaceUserTitle'
import { SpaceUserTitleRepository } from '@Core/SpaceUserTitle/domain/SpaceUserTitleRepository'
import { Id } from '@Core/SpaceUserTitle/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class SpaceUserTitleRepositoryMock implements SpaceUserTitleRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<SpaceUserTitle>
  private expectedSearch: Array<SpaceUserTitle> = []

  async find (id: Id): Promise<Nullable<SpaceUserTitle>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (spaceUserTitle: Nullable<SpaceUserTitle>): void {
    this.expectedFind = spaceUserTitle
  }

  returnOnSearch (spaceUserTitle: Array<SpaceUserTitle>): void {
    this.expectedSearch = spaceUserTitle
  }

  async search (criteria: Criteria): Promise<Array<SpaceUserTitle>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (spaceUserTitle: SpaceUserTitle): Promise<void> {
    this.mockPersist(spaceUserTitle)
  }

  async delete (spaceUserTitle: SpaceUserTitle): Promise<void> {
    this.mockDelete(spaceUserTitle)
  }
  
  assertPersistHasBeenCalledWith (spaceUserTitle: SpaceUserTitle) {
    expect(this.mockPersist).toHaveBeenCalledWith(spaceUserTitle)
  }
  
  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
