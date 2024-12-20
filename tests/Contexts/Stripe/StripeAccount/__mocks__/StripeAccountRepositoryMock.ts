import { StripeAccount } from '@Stripe/StripeAccount/domain/StripeAccount'
import { AccountRepository } from '@Stripe/StripeAccount/domain/AccountRepository'
import { Id } from '@Stripe/StripeAccount/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class StripeAccountRepositoryMock implements AccountRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()

  private expectedFind: Nullable<StripeAccount>
  private expectedSearch: Array<StripeAccount> = []

  async find (id: Id): Promise<Nullable<StripeAccount>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (stripeAccount: Nullable<StripeAccount>): void {
    this.expectedFind = stripeAccount
  }

  returnOnSearch (stripeAccount: Array<StripeAccount>): void {
    this.expectedSearch = stripeAccount
  }

  async search (criteria: Criteria): Promise<Array<StripeAccount>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (stripeAccount: StripeAccount): Promise<void> {
    this.mockPersist(stripeAccount)
  }

  assertPersistHasBeenCalledWith (stripeAccount: StripeAccount) {
    expect(this.mockPersist).toHaveBeenCalledWith(stripeAccount)
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
