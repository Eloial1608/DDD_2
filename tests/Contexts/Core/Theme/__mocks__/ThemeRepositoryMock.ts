import { Theme } from '@Core/Theme/domain/Theme'
import { ThemeRepository } from '@Core/Theme/domain/ThemeRepository'
import { Id } from '@Core/Theme/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class ThemeRepositoryMock implements ThemeRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<Theme>
  private expectedSearch: Array<Theme> = []

  async find (id: Id): Promise<Nullable<Theme>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (theme: Nullable<Theme>): void {
    this.expectedFind = theme
  }

  returnOnSearch (theme: Array<Theme>): void {
    this.expectedSearch = theme
  }

  async search (criteria: Criteria): Promise<Array<Theme>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (theme: Theme): Promise<void> {
    this.mockPersist(theme)
  }

  assertPersistHasBeenCalledWith (theme: Theme) {
    expect(this.mockPersist).toHaveBeenCalledWith(theme)
  }

  async delete (theme: Theme): Promise<void> {
    this.mockDelete(theme)
  }

  assertDeleteHasBeenCalledWith (theme: Theme) {
    expect(this.mockDelete).toHaveBeenCalledWith(theme)
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
