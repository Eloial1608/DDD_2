import { Plan } from '@Core/Plan/domain/Plan'
import { PlanRepository } from '@Core/Plan/domain/PlanRepository'
import { Id } from '@Core/Plan/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class PlanRepositoryMock implements PlanRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()

  private expectedFind: Nullable<Plan>
  private expectedSearch: Array<Plan> = []

  async find (id: Id): Promise<Nullable<Plan>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (plan: Nullable<Plan>): void {
    this.expectedFind = plan
  }

  returnOnSearch (plan: Array<Plan>): void {
    this.expectedSearch = plan
  }

  async search (criteria: Criteria): Promise<Array<Plan>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (plan: Plan): Promise<void> {
    this.mockPersist(plan)
  }

  assertPersistHasBeenCalledWith (plan: Plan) {
    expect(this.mockPersist).toHaveBeenCalledWith(plan)
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
