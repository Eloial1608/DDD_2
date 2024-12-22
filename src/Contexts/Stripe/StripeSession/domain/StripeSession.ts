import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { AccountId } from './ValueObjects/AccountId'
import { Product } from './ValueObjects/Product'
import { Price } from './ValueObjects/Price'
import { Completed } from './ValueObjects/Completed'
import { SuccessUrl } from './ValueObjects/SuccessUrl'
import { FailUrl } from './ValueObjects/FailUrl'
import { StripeId } from './ValueObjects/StripeId'
import { Url } from './ValueObjects/Url'
import { StripeSessionCreatedDomainEvent } from './Events/StripeSessionCreatedDomainEvent'
import { StripeSessionVerifiedDomainEvent } from './Events/StripeSessionVerifiedDomainEvent'
import { CustomerId } from './ValueObjects/CustomerId'

export class StripeSession extends AggregateRoot {
  constructor (
    readonly id: Id,
    readonly accountId: AccountId,
    readonly stripeId: StripeId,
    readonly url: Url,
    readonly product: Product,
    readonly price: Price,
    readonly customerId: CustomerId,
    readonly completed: Completed,
    readonly successUrl: SuccessUrl,
    readonly failUrl: FailUrl
  ) {
    super()
  }

  static create (
    id: Id,
    accountId: AccountId,
    stripeId: StripeId,
    url: Url,
    product: Product,
    price: Price,
    customerId: CustomerId,
    successUrl: SuccessUrl,
    failUrl: FailUrl
  ): StripeSession {
    const session = new StripeSession(
      id,
      accountId,
      stripeId,
      url,
      product,
      price,
      customerId,
      new Completed(false),
      successUrl,
      failUrl
    )

    session.record(StripeSessionCreatedDomainEvent.fromAggregate(session))

    return session
  }

  verify (): StripeSession {
    const session = new StripeSession(
      this.id,
      this.accountId,
      this.stripeId,
      this.url,
      this.product,
      this.price,
      this.customerId,
      new Completed(true),
      this.successUrl,
      this.failUrl
    )

    session.record(StripeSessionVerifiedDomainEvent.fromAggregate(session))

    return session
  }
}
