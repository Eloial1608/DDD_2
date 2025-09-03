import { CreatedEntity } from '@Metrics/CreatedEntity/domain/CreatedEntity'
import { CreatedEntityRepository } from '@Metrics/CreatedEntity/domain/CreatedEntityRepository'
import { Id } from '@Metrics/CreatedEntity/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class CreatedEntityRepositoryMock implements CreatedEntityRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<CreatedEntity>
  private expectedSearch: Array<CreatedEntity> = []

  async find (id: Id): Promise<Nullable<CreatedEntity>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (createdentity: Nullable<CreatedEntity>): void {
    this.expectedFind = createdentity
  }

  returnOnSearch (createdentity: Array<CreatedEntity>): void {
    this.expectedSearch = createdentity
  }

  async search (criteria: Criteria): Promise<Array<CreatedEntity>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (createdentity: CreatedEntity): Promise<void> {
    this.mockPersist(createdentity)
  }

  assertPersistHasBeenCalledWith (createdentity: CreatedEntity) {
    expect(this.mockPersist).toHaveBeenCalledWith(createdentity)
  }

  assertDeleteHasBeenCalledWith (createdentity: CreatedEntity) {
    expect(this.mockDelete).toHaveBeenCalledWith(createdentity)
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
