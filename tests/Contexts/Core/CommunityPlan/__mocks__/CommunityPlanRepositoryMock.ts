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

  returnOnFind (communityplan: Nullable<CommunityPlan>): void {
    this.expectedFind = communityplan
  }

  returnOnSearch (communityplan: Array<CommunityPlan>): void {
    this.expectedSearch = communityplan
  }

  async search (criteria: Criteria): Promise<Array<CommunityPlan>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (communityplan: CommunityPlan): Promise<void> {
    this.mockPersist(communityplan)
  }

  assertPersistHasBeenCalledWith (communityplan: CommunityPlan) {
    expect(this.mockPersist).toHaveBeenCalledWith(communityplan)
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
