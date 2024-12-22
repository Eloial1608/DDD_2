import { StripeSessionRepository } from '@Stripe/StripeSession/domain/StripeSessionRepository'
import { Id } from '@Stripe/StripeSession/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { mockFn } from '@Tests/Contexts/mockUtils'
import { StripeSession } from '@Stripe/StripeSession/domain/StripeSession'

export class StripeSessionRepositoryMock implements StripeSessionRepository {
  private mockFind = mockFn()
  private mockPersist = mockFn()

  private expectedFind: Nullable<StripeSession>

  async find (id: Id): Promise<Nullable<StripeSession>> {
    this.mockFind(id)
    return this.expectedFind
  }

  returnOnFind (stripeSession: Nullable<StripeSession>): void {
    this.expectedFind = stripeSession
  }

  async persist (stripeSession: StripeSession): Promise<void> {
    this.mockPersist(stripeSession)
  }

  assertPersistHasBeenCalledWith (stripeSession: StripeSession) {
    expect(this.mockPersist).toHaveBeenCalledWith(stripeSession)
  }

  assertFindHasBeenCalledWith (id: Id) {
    expect(this.mockFind).toHaveBeenCalledWith(id)
  }
}
