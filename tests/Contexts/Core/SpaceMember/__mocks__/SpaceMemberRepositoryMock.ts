import { SpaceMember } from '@Core/SpaceMember/domain/SpaceMember'
import { SpaceMemberRepository } from '@Core/SpaceMember/domain/SpaceMemberRepository'
import { Id } from '@Core/SpaceMember/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class SpaceMemberRepositoryMock implements SpaceMemberRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()

  private expectedFind: Nullable<SpaceMember>
  private expectedSearch: Array<SpaceMember> = []

  async find (id: Id): Promise<Nullable<SpaceMember>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (spacemember: Nullable<SpaceMember>): void {
    this.expectedFind = spacemember
  }

  returnOnSearch (spacemember: Array<SpaceMember>): void {
    this.expectedSearch = spacemember
  }

  async search (criteria: Criteria): Promise<Array<SpaceMember>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (spacemember: SpaceMember): Promise<void> {
    this.mockPersist(spacemember)
  }

  assertPersistHasBeenCalledWith (spacemember: SpaceMember) {
    expect(this.mockPersist).toHaveBeenCalledWith(spacemember)
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
