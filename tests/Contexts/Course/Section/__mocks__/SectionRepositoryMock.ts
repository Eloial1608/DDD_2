import { Section } from '@Course/Section/domain/Section'
import { SectionRepository } from '@Course/Section/domain/SectionRepository'
import { Id } from '@Course/Section/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class SectionRepositoryMock implements SectionRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<Section>
  private expectedSearch: Array<Section> = []

  async find (id: Id): Promise<Nullable<Section>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (section: Nullable<Section>): void {
    this.expectedFind = section
  }

  returnOnSearch (section: Array<Section>): void {
    this.expectedSearch = section
  }

  async search (criteria: Criteria): Promise<Array<Section>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (section: Section): Promise<void> {
    this.mockPersist(section)
  }

  assertPersistHasBeenCalledWith (section: Section) {
    expect(this.mockPersist).toHaveBeenCalledWith(section)
  }

  async delete (section: Section): Promise<void> {
    this.mockDelete(section)
  }

  assertDeleteHasBeenCalledWith (section: Section) {
    expect(this.mockDelete).toHaveBeenCalledWith(section)
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
