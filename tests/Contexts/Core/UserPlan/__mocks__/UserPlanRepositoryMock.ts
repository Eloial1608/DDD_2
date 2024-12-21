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

  returnOnFind (userPlan: Nullable<UserPlan>): void {
    this.expectedFind = userPlan
  }

  returnOnSearch (userPlan: Array<UserPlan>): void {
    this.expectedSearch = userPlan
  }

  async search (criteria: Criteria): Promise<Array<UserPlan>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (userPlan: UserPlan): Promise<void> {
    this.mockPersist(userPlan)
  }

  assertPersistHasBeenCalledWith (userPlan: UserPlan) {
    expect(this.mockPersist).toHaveBeenCalledWith(userPlan)
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
