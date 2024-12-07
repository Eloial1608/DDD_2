import { CommunityPlan } from '@Core/CommunityPlan/domain/CommunityPlan'
import { CommunityPlanRepository } from '@Core/CommunityPlan/domain/CommunityPlanRepository'
import { Id } from '@Core/CommunityPlan/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class CommunityPlanRepositoryMock implements CommunityPlanRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()

  private expectedFind: Nullable<CommunityPlan>
  private expectedSearch: Array<CommunityPlan> = []

  async find (id: Id): Promise<Nullable<CommunityPlan>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (communityPlan: Nullable<CommunityPlan>): void {
    this.expectedFind = communityPlan
  }

  returnOnSearch (communityPlan: Array<CommunityPlan>): void {
    this.expectedSearch = communityPlan
  }

  async search (criteria: Criteria): Promise<Array<CommunityPlan>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (communityPlan: CommunityPlan): Promise<void> {
    this.mockPersist(communityPlan)
  }

  assertPersistHasBeenCalledWith (communityPlan: CommunityPlan) {
    expect(this.mockPersist).toHaveBeenCalledWith(communityPlan)
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
