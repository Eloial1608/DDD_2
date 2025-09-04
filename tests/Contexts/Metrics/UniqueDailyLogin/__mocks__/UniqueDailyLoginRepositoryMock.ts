import { UniqueDailyLogin } from '@Metrics/UniqueDailyLogin/domain/UniqueDailyLogin'
import { UniqueDailyLoginRepository } from '@Metrics/UniqueDailyLogin/domain/UniqueDailyLoginRepository'
import { Id } from '@Metrics/UniqueDailyLogin/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class UniqueDailyLoginRepositoryMock implements UniqueDailyLoginRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<UniqueDailyLogin>
  private expectedSearch: Array<UniqueDailyLogin> = []

  async find (id: Id): Promise<Nullable<UniqueDailyLogin>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (uniquedailylogin: Nullable<UniqueDailyLogin>): void {
    this.expectedFind = uniquedailylogin
  }

  returnOnSearch (uniquedailylogin: Array<UniqueDailyLogin>): void {
    this.expectedSearch = uniquedailylogin
  }

  async search (criteria: Criteria): Promise<Array<UniqueDailyLogin>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (uniquedailylogin: UniqueDailyLogin): Promise<void> {
    this.mockPersist(uniquedailylogin)
  }

  assertPersistHasBeenCalledWith (uniquedailylogin: UniqueDailyLogin) {
    expect(this.mockPersist).toHaveBeenCalledWith(uniquedailylogin)
  }

  assertDeleteHasBeenCalledWith (uniquedailylogin: UniqueDailyLogin) {
    expect(this.mockDelete).toHaveBeenCalledWith(uniquedailylogin)
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
