import { Type } from '@Projects/Type/domain/Type'
import { TypeRepository } from '@Projects/Type/domain/TypeRepository'
import { Id } from '@Projects/Type/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class TypeRepositoryMock implements TypeRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<Type>
  private expectedSearch: Array<Type> = []

  async find (id: Id): Promise<Nullable<Type>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (type: Nullable<Type>): void {
    this.expectedFind = type
  }

  returnOnSearch (type: Array<Type>): void {
    this.expectedSearch = type
  }

  async search (criteria: Criteria): Promise<Array<Type>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (type: Type): Promise<void> {
    this.mockPersist(type)
  }

  async delete (type: Type): Promise<void> {
    this.mockDelete(type)
  }

  assertPersistHasBeenCalledWith (type: Type) {
    expect(this.mockPersist).toHaveBeenCalledWith(type)
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
