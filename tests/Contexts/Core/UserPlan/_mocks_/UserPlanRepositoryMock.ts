import { UserPlan } from '@Core/UserPlan/domain/UserPlan'
import { UserPlanRepository } from '@Core/UserPlan/domain/UserPlanRepository'
import { Id } from '@Core/UserPlan/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class UserPlanRepositoryMock implements UserPlanRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()

  private expectedFind: Nullable<UserPlan>
  private expectedSearch: Array<UserPlan> = []

  async find (id: Id): Promise<Nullable<UserPlan>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (spaceMember: Nullable<UserPlan>): void {
    this.expectedFind = spaceMember
  }

  returnOnSearch (spaceMember: Array<UserPlan>): void {
    this.expectedSearch = spaceMember
  }

  async search (criteria: Criteria): Promise<Array<UserPlan>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (spaceMember: UserPlan): Promise<void> {
    this.mockPersist(spaceMember)
  }

  assertPersistHasBeenCalledWith (spaceMember: UserPlan) {
    expect(this.mockPersist).toHaveBeenCalledWith(spaceMember)
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
