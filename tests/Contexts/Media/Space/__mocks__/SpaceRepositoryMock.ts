import { Space } from '@Media/Space/domain/Space'
import { SpaceRepository } from '@Media/Space/domain/SpaceRepository'
import { Id } from '@Media/Space/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class SpaceRepositoryMock implements SpaceRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<Space>
  private expectedSearch: Array<Space> = []

  async find (id: Id): Promise<Nullable<Space>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (space: Nullable<Space>): void {
    this.expectedFind = space
  }

  returnOnSearch (space: Array<Space>): void {
    this.expectedSearch = space
  }

  async search (criteria: Criteria): Promise<Array<Space>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (space: Space): Promise<void> {
    this.mockPersist(space)
  }

  assertPersistHasBeenCalledWith (space: Space) {
    expect(this.mockPersist).toHaveBeenCalledWith(space)
  }

  async delete (space: Space): Promise<void> {
    this.mockDelete(space)
  }

  assertDeleteHasBeenCalledWith (space: Space) {
    expect(this.mockDelete).toHaveBeenCalledWith(space)
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
