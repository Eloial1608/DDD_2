import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'
import { FindStripeAccountByIdQuery } from '@Stripe/StripeAccount/application/FindById/FindStripeAccountByIdQuery'
import { StripeAccountResponse } from '@Stripe/StripeAccount/application/StripeAccountResponse'
import { StripeHttpProductRepository } from '@Stripe/StripeProduct/domain/StripeHttpProductRepository'
import { StripeProduct } from '@Stripe/StripeProduct/domain/StripeProduct'
import { StripeProductRepository } from '@Stripe/StripeProduct/domain/StripeProductRepository'
import { AccountId } from '@Stripe/StripeProduct/domain/ValueObjects/AccountId'
import { Id } from '@Stripe/StripeProduct/domain/ValueObjects/Id'
import { Name } from '@Stripe/StripeProduct/domain/ValueObjects/Name'
import { Price } from '@Stripe/StripeProduct/domain/ValueObjects/Price'
import { PriceId } from '@Stripe/StripeProduct/domain/ValueObjects/PriceId'
import { ProductId } from '@Stripe/StripeProduct/domain/ValueObjects/ProductId'
import { ProductType } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'

type Params = {
    id: Id
    name: Name,
    accountId: AccountId,
    productType: ProductType,
    productId: ProductId,
    price: Price
}

export class Updater {
  constructor (
        private readonly repository: StripeProductRepository,
        private readonly httpRepository: StripeHttpProductRepository,
        private readonly queryBus: QueryBus,
        private readonly eventBus: EventBus
  ) {}

  async run (params: Params) {
    const account = await this.getAccountById(params.accountId)

    if (!account) return

    const product = await this.repository.find(params.id)
    let productToPersist

    if (!product) {
      const price = await this.httpRepository.create(account.apiKey, {
        id: params.id,
        name: params.name,
        price: params.price,
        renovationInterval: undefined,
        renovationType: undefined
      })

      productToPersist = StripeProduct.create(
        params.id,
        params.name,
        params.accountId,
        params.productType,
        params.productId,
        params.price,
        new PriceId(price),
        undefined,
        undefined
      )
    } else {
      const price = await this.httpRepository.update(account.apiKey, {
        id: params.id,
        name: params.name,
        price: params.price,
        renovationInterval: undefined,
        renovationType: undefined
      })

      productToPersist = product.update(
        params.name,
        params.accountId,
        params.productType,
        params.productId,
        params.price,
        new PriceId(price),
        undefined,
        undefined
      )
    }

    await this.repository.persist(productToPersist)
    await this.eventBus.publish(productToPersist.pullDomainEvents())
  }

  async getAccountById (id: AccountId) {
    try {
      const query = new FindStripeAccountByIdQuery(id.valueOf())

      return (await this.queryBus.ask<StripeAccountResponse>(query)).response
    } catch {
      return null
    }
  }
}
