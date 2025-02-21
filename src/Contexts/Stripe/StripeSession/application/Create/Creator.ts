import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindStripeAccountByIdQuery } from '@Stripe/StripeAccount/application/FindById/FindStripeAccountByIdQuery'
import { StripeAccountResponse } from '@Stripe/StripeAccount/application/StripeAccountResponse'
import { FindStripeProductByIdQuery } from '@Stripe/StripeProduct/application/FindById/FindStripeProductByIdQuery'
import { StripeProductResponse } from '@Stripe/StripeProduct/application/StripeProductResponse'
import { StripeSessionAlreadyExists } from '@Stripe/StripeSession/domain/Errors/StripeSessionAlreadyExists'
import { StripeHttpSessionRepository } from '@Stripe/StripeSession/domain/StripeHttpSessionRepository'
import { StripeSession } from '@Stripe/StripeSession/domain/StripeSession'
import { StripeSessionRepository } from '@Stripe/StripeSession/domain/StripeSessionRepository'
import { AccountId } from '@Stripe/StripeSession/domain/ValueObjects/AccountId'
import { CustomerId } from '@Stripe/StripeSession/domain/ValueObjects/CustomerId'
import { FailUrl } from '@Stripe/StripeSession/domain/ValueObjects/FailUrl'
import { Id } from '@Stripe/StripeSession/domain/ValueObjects/Id'
import { Price } from '@Stripe/StripeSession/domain/ValueObjects/Price'
import { Product } from '@Stripe/StripeSession/domain/ValueObjects/Product'
import { StripeId } from '@Stripe/StripeSession/domain/ValueObjects/StripeId'
import { SuccessUrl } from '@Stripe/StripeSession/domain/ValueObjects/SuccessUrl'
import { Url } from '@Stripe/StripeSession/domain/ValueObjects/Url'

type Params = {
    id: Id
    accountId: AccountId
    productId: string
    customerId: CustomerId
    successUrl: SuccessUrl
    failUrl: FailUrl
}

export class Creator {
  constructor (
        private readonly repository: StripeSessionRepository,
        private readonly httpRepository: StripeHttpSessionRepository,
        private readonly queryBus: QueryBus,
        private readonly eventBus: EventBus
  ) {}

  async run (params: Params) {
    const existingSession = await this.repository.find(params.id)

    if (existingSession) throw new StripeSessionAlreadyExists(params.id)

    const account = await this.getAccount(params.accountId)
    const product = await this.getProduct(params.productId)

    const externalSession = await this.httpRepository.create(account.apiKey, {
      successUrl: params.successUrl.valueOf().replace('{{id}}', params.id.valueOf()),
      failUrl: params.failUrl.valueOf().replace('{{id}}', params.id.valueOf()),
      priceId: product.priceId.valueOf(),
      renovationInterval: product.renovationInterval?.valueOf(),
      renovationType: product.renovationType?.valueOf()
    })

    const session = StripeSession.create(
      params.id,
      params.accountId,
      new StripeId(externalSession.id),
      new Url(externalSession.url.replaceAll('"', '')),
      new Product(
        product.id.valueOf(),
        product.productType.valueOf(),
        product.priceId.valueOf(),
        product.name.valueOf(),
        product.renovationInterval?.valueOf(),
        product.renovationType?.valueOf()
      ),
      new Price(product.price.valueOf()),
      params.customerId,
      params.successUrl,
      params.failUrl
    )

    await this.repository.persist(session)
    await this.eventBus.publish(session.pullDomainEvents())
  }

  private async getAccount (accountId: AccountId) {
    const query = new FindStripeAccountByIdQuery(accountId.valueOf())

    return (await this.queryBus.ask<StripeAccountResponse>(query)).response
  }

  private async getProduct (productId: string) {
    const query = new FindStripeProductByIdQuery(productId)

    return (await this.queryBus.ask<StripeProductResponse>(query)).response
  }
}
