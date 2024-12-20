import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { AccountRepository } from '@Stripe/StripeAccount/domain/AccountRepository'
import { StripeAccountAlreadyExists } from '@Stripe/StripeAccount/domain/Errors/StripeAccountAlreadyExists'
import { StripeAccount } from '@Stripe/StripeAccount/domain/StripeAccount'
import { StripeAccountRepository } from '@Stripe/StripeAccount/domain/StripeAccountRepository'
import { ApiKey } from '@Stripe/StripeAccount/domain/ValueObjects/ApiKey'
import { Id } from '@Stripe/StripeAccount/domain/ValueObjects/Id'

export class Creator {
  constructor (
    private readonly repository: AccountRepository,
    private readonly stripeRepository: StripeAccountRepository,
    private readonly eventBus: EventBus
  ) {}

  async run (id: Id, apiKey: ApiKey) {
    await this.stripeRepository.verify(apiKey)

    const existing = await this.repository.find(id)

    if (existing) throw new StripeAccountAlreadyExists(id)

    const account = StripeAccount.create(id, apiKey)

    await this.repository.persist(account)
    await this.eventBus.publish(account.pullDomainEvents())
  }
}
