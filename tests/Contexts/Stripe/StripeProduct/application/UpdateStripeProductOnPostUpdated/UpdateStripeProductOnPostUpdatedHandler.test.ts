import { Updater } from '@Stripe/StripeProduct/application/UpdateStripeProductOnPostUpdated/Updater'
import { StripeProductRepositoryMock } from '../../__mocks__/StripeProductRepositoryMock'
import { UpdateStripeProductOnPostUpdatedHandler } from '@Stripe/StripeProduct/application/UpdateStripeProductOnPostUpdated/UpdateStripeProductOnPostUpdatedHandler'
import { HttpStripeProductRepositoryMock } from '../../__mocks__/HttpStripeProductRepositoryMock'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { StripeProductMother } from '../../domain/StripeProductMother'
import { ProductType, ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'
import { PriceId } from '@Stripe/StripeProduct/domain/ValueObjects/PriceId'
import { StripeAccountMother } from '../../../StripeAccount/domain/StripeAccountMother'
import { StripeAccountResponse } from '@Stripe/StripeAccount/application/StripeAccountResponse'
import { PostMother } from '@Tests/Contexts/Posts/Post/domain/PostMother'
import { PostUpdatedDomainEvent } from '@Posts/Post/domain/Events/PostUpdatedDomainEvent'
import { StripeProductUpdatedDomainEvent } from '@Stripe/StripeProduct/domain/Events/StripeProductUpdatedDomainEvent'
import { Price as PostPrice, PriceCurrency, PriceValue } from '@Posts/Post/domain/ValueObjects/Price'
import { Price } from '@Stripe/StripeProduct/domain/ValueObjects/Price'
import { IsPaid } from '@Posts/Post/domain/ValueObjects/IsPaid'

let repository: StripeProductRepositoryMock
let updater: Updater
let handler: UpdateStripeProductOnPostUpdatedHandler
let httpRepository: HttpStripeProductRepositoryMock
let eventBus: EventBusMock
let queryBus: QueryBusMock

describe('UpdateStripeProductOnPostUpdated should', () => {
  beforeEach(() => {
    repository = new StripeProductRepositoryMock()
    httpRepository = new HttpStripeProductRepositoryMock()
    eventBus = new EventBusMock()
    queryBus = new QueryBusMock()
    updater = new Updater(repository, httpRepository, queryBus, eventBus)
    handler = new UpdateStripeProductOnPostUpdatedHandler(updater)
  })

  test('update a post stripe product', async () => {
    const account = StripeAccountMother.random()

    queryBus.returnOnAsk(new StripeAccountResponse(account))

    const post = PostMother.create({
      communityId: account.id,
      isPaid: new IsPaid(true),
      price: new PostPrice(
        new PriceValue(100),
        new PriceCurrency('EUR')
      )
    })

    const initialStripeProduct = StripeProductMother.create({
      productType: new ProductType(ProductTypes.POSTS),
      accountId: account.id,
      productId: post.id,
      id: post.id,
      name: post.title
    })

    repository.returnOnFind(initialStripeProduct)

    const stripeProduct = StripeProductMother.create({
      productType: new ProductType(ProductTypes.POSTS),
      priceId: new PriceId('paymentId'),
      accountId: account.id,
      productId: post.id,
      id: post.id,
      name: post.title,
      price: new Price(String(post.price!.value))
    })

    const event = PostUpdatedDomainEvent.fromAggregate(post)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(stripeProduct)
  })

  test('update a new StripeProductUpdatedDomainEvent', async () => {
    const account = StripeAccountMother.random()

    queryBus.returnOnAsk(new StripeAccountResponse(account))

    const post = PostMother.create({
      communityId: account.id,
      isPaid: new IsPaid(true),
      price: new PostPrice(
        new PriceValue(100),
        new PriceCurrency('EUR')
      )
    })

    const initialStripeProduct = StripeProductMother.create({
      productType: new ProductType(ProductTypes.POSTS),
      accountId: account.id,
      productId: post.id,
      id: post.id,
      name: post.title
    })

    repository.returnOnFind(initialStripeProduct)

    const stripeProduct = StripeProductMother.create({
      productType: new ProductType(ProductTypes.POSTS),
      priceId: new PriceId('paymentId'),
      accountId: account.id,
      productId: post.id,
      id: post.id,
      name: post.title,
      price: new Price(String(post.price!.value))
    })

    const event = PostUpdatedDomainEvent.fromAggregate(post)

    const expectedEvent = StripeProductUpdatedDomainEvent.fromAggregate(stripeProduct)

    await handler.on(event)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
