import { StripeProduct } from '@Stripe/StripeProduct/domain/StripeProduct'
import { StripeProductRepository } from '@Stripe/StripeProduct/domain/StripeProductRepository'
import { Id } from '@Stripe/StripeProduct/domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'

export class StripeProductRepositoryMock implements StripeProductRepository {
  private mockFind = mockFn()
  private mockSearch = mockFn()
  private mockPersist = mockFn()
  private mockDelete = mockFn()

  private expectedFind: Nullable<StripeProduct>
  private expectedSearch: Array<StripeProduct> = []

  async find (id: Id): Promise<Nullable<StripeProduct>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (stripeProduct: Nullable<StripeProduct>): void {
    this.expectedFind = stripeProduct
  }

  returnOnSearch (stripeProduct: Array<StripeProduct>): void {
    this.expectedSearch = stripeProduct
  }

  async search (criteria: Criteria): Promise<Array<StripeProduct>> {
    this.mockSearch(criteria)
    return this.expectedSearch
  }

  async persist (stripeProduct: StripeProduct): Promise<void> {
    this.mockPersist(stripeProduct)
  }

  assertPersistHasBeenCalledWith (stripeProduct: StripeProduct) {
    expect(this.mockPersist).toHaveBeenCalledWith(stripeProduct)
  }

  async delete (stripeProduct: StripeProduct): Promise<void> {
    this.mockDelete(stripeProduct)
  }

  assertDeleteHasBeenCalledWith (stripeProduct: StripeProduct) {
    expect(this.mockDelete).toHaveBeenCalledWith(stripeProduct)
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }

  assertSearchHasBeenCalledWith (criteria: Criteria) {
    expect(this.mockSearch).toHaveBeenCalledWith(criteria)
  }
}
