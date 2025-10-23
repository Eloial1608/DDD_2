import { Level } from '@Core/Level/domain/Level'
import { LevelRepository } from '@Core/Level/domain/LevelRepository'
import { Id } from '@Core/Level/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class LevelRepositoryMock implements LevelRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<Level>
  private expectedSearch: Array<Level> = []

  async find (id: Id): Promise<Nullable<Level>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (level: Nullable<Level>): void {
    this.expectedFind = level
  }

  returnOnSearch (level: Array<Level>): void {
    this.expectedSearch = level
  }

  async search (criteria: Criteria): Promise<Array<Level>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (level: Level): Promise<void> {
    this.mockPersist(level)
  }

  async delete (level: Level): Promise<void> {
    this.mockDelete(level)
  }

  assertDeleteHasBeenCalledWith (level: Level) {
    expect(this.mockDelete).toHaveBeenCalledWith(level)
  }

  assertPersistHasBeenCalledWith (level: Level) {
    expect(this.mockPersist).toHaveBeenCalledWith(level)
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
