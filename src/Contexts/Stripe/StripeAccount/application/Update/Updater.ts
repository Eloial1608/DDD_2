import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { AccountRepository } from '@Stripe/StripeAccount/domain/AccountRepository'
import { StripeAccountNotFound } from '@Stripe/StripeAccount/domain/Errors/StripeAccountNotFound'
import { StripeAccountRepository } from '@Stripe/StripeAccount/domain/StripeAccountRepository'
import { ApiKey } from '@Stripe/StripeAccount/domain/ValueObjects/ApiKey'
import { Id } from '@Stripe/StripeAccount/domain/ValueObjects/Id'

export class Updater {
  constructor (
    private readonly repository: AccountRepository,
    private readonly stripeRepository: StripeAccountRepository,
    private readonly eventBus: EventBus
  ) {}

  async run (id: Id, apiKey: ApiKey) {
    await this.stripeRepository.verify(apiKey)

    const account = await this.repository.find(id)

    if (!account) throw new StripeAccountNotFound(id)

    const updatedAccount = account.update(apiKey)

    await this.repository.persist(updatedAccount)
    await this.eventBus.publish(updatedAccount.pullDomainEvents())
  }
}
