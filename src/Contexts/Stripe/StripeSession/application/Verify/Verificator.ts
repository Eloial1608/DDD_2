import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindStripeAccountByIdQuery } from '@Stripe/StripeAccount/application/FindById/FindStripeAccountByIdQuery'
import { StripeAccountResponse } from '@Stripe/StripeAccount/application/StripeAccountResponse'
import { HttpStripeSessionRepository } from '@Stripe/StripeSession/infrastructure/HttpStripeSessionRepository'
import { StripeSessionNotFound } from '@Stripe/StripeSession/domain/Errors/StripeSessionNotFound'
import { StripeSessionRepository } from '@Stripe/StripeSession/domain/StripeSessionRepository'
import { AccountId } from '@Stripe/StripeSession/domain/ValueObjects/AccountId'
import { Id } from '@Stripe/StripeSession/domain/ValueObjects/Id'
import { StripeSessionNotVerified } from '@Stripe/StripeSession/domain/Errors/StripeSessionNotVerified'

export class Verificator {
  constructor (
    private readonly repository: StripeSessionRepository,
    private readonly httpRepository: HttpStripeSessionRepository,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus
  ) {}

  async run (id: Id) {
    const session = await this.repository.find(id)

    if (!session) throw new StripeSessionNotFound(id)

    const account = await this.getAccount(session.accountId)

    const isVerified = await this.httpRepository.verify(account.apiKey, session)

    if (!isVerified) throw new StripeSessionNotVerified(id)

    const verified = session.verify()

    await this.repository.persist(verified)
    await this.eventBus.publish(verified.pullDomainEvents())
  }

  private async getAccount (accountId: AccountId) {
    const query = new FindStripeAccountByIdQuery(accountId.valueOf())

    return (await this.queryBus.ask<StripeAccountResponse>(query)).response
  }
}
