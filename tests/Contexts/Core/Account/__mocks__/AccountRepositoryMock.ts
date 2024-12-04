import { Account } from '@Core/Account/domain/Account'
import { AccountRepository } from '@Core/Account/domain/AccountRepository'
import { Id } from '@Core/Account/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class AccountRepositoryMock implements AccountRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()

  private expectedFind: Nullable<Account>
  private expectedSearch: Array<Account> = []

  async find (id: Id): Promise<Nullable<Account>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (account: Nullable<Account>): void {
    this.expectedFind = account
  }

  returnOnSearch (account: Array<Account>): void {
    this.expectedSearch = account
  }

  async search (criteria: Criteria): Promise<Array<Account>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (account: Account): Promise<void> {
    this.mockPersist(account)
  }

  assertPersistHasBeenCalledWith (account: Account) {
    expect(this.mockPersist).toHaveBeenCalledWith(account)
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
