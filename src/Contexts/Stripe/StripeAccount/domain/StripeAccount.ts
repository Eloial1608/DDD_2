import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from '@Stripe/StripeAccount/domain/ValueObjects/Id'
import { ApiKey } from './ValueObjects/ApiKey'
import { StripeAccountCreatedDomainEvent } from './Events/StripeAccountCreatedDomainEvent'
import { StripeAccountUpdatedDomainEvent } from './Events/StripeAccountUpdatedDomainEvent'

export class StripeAccount extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly apiKey: ApiKey
  ) {
    super()
  }

  static create (id: Id, apiKey: ApiKey): StripeAccount {
    const account = new StripeAccount(id, apiKey)

    account.record(StripeAccountCreatedDomainEvent.fromAggregate(account))

    return account
  }

  update (apiKey: ApiKey): StripeAccount {
    const account = new StripeAccount(this.id, apiKey)

    account.record(StripeAccountUpdatedDomainEvent.fromAggregate(account))

    return account
  }
}
