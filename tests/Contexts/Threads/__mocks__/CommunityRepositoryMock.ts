import { Community } from '@Threads/Community/domain/Community'
import { CommunityRepository } from '@Threads/Community/domain/CommunityRepository'
import { Id } from '@Threads/Community/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class CommunityRepositoryMock implements CommunityRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<Community>
  private expectedSearch: Array<Community> = []

  async find (id: Id): Promise<Nullable<Community>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (community: Nullable<Community>): void {
    this.expectedFind = community
  }

  returnOnSearch (community: Array<Community>): void {
    this.expectedSearch = community
  }

  async search (criteria: Criteria): Promise<Array<Community>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (community: Community): Promise<void> {
    this.mockPersist(community)
  }

  assertPersistHasBeenCalledWith (community: Community) {
    expect(this.mockPersist).toHaveBeenCalledWith(community)
  }

  async delete (community: Community): Promise<void> {
    this.mockDelete(community)
  }

  assertDeleteHasBeenCalledWith (community: Community) {
    expect(this.mockDelete).toHaveBeenCalledWith(community)
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
