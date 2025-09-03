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

  private expectedFind: Nullable<SpaceUserTitle>
  private expectedSearch: Array<SpaceUserTitle> = []

  async find (id: Id): Promise<Nullable<SpaceUserTitle>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (space: Nullable<SpaceUserTitle>): void {
    this.expectedFind = space
  }

  returnOnSearch (space: Array<SpaceUserTitle>): void {
    this.expectedSearch = space
  }

  async search (criteria: Criteria): Promise<Array<SpaceUserTitle>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (space: SpaceUserTitle): Promise<void> {
    this.mockPersist(space)
  }

  assertPersistHasBeenCalledWith (space: SpaceUserTitle) {
    expect(this.mockPersist).toHaveBeenCalledWith(space)
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
