import { PlanForUsers } from '@Core/PlanForUsers/domain/PlanForUsers'
import { PlanForUsersRepository } from '@Core/PlanForUsers/domain/PlanForUsersRepository'
import { Id } from '@Core/PlanForUsers/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class PlanForUsersRepositoryMock implements PlanForUsersRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()

  private expectedFind: Nullable<PlanForUsers>
  private expectedSearch: Array<PlanForUsers> = []

  async find (id: Id): Promise<Nullable<PlanForUsers>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (planForUsers: Nullable<PlanForUsers>): void {
    this.expectedFind = planForUsers
  }

  returnOnSearch (planForUsers: Array<PlanForUsers>): void {
    this.expectedSearch = planForUsers
  }

  async search (criteria: Criteria): Promise<Array<PlanForUsers>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (planForUsers: PlanForUsers): Promise<void> {
    this.mockPersist(planForUsers)
  }

  assertPersistHasBeenCalledWith (planForUsers: PlanForUsers) {
    expect(this.mockPersist).toHaveBeenCalledWith(planForUsers)
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
