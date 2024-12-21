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

  returnOnFind (spaceMember: Nullable<SpaceMember>): void {
    this.expectedFind = spaceMember
  }

  returnOnSearch (spaceMember: Array<SpaceMember>): void {
    this.expectedSearch = spaceMember
  }

  async search (criteria: Criteria): Promise<Array<SpaceMember>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (spaceMember: SpaceMember): Promise<void> {
    this.mockPersist(spaceMember)
  }

  assertPersistHasBeenCalledWith (spaceMember: SpaceMember) {
    expect(this.mockPersist).toHaveBeenCalledWith(spaceMember)
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
