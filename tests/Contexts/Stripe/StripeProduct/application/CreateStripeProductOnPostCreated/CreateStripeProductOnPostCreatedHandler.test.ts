import { Creator } from '@Stripe/StripeProduct/application/CreateStripeProductOnPostCreated/Creator'
import { StripeProductRepositoryMock } from '../../__mocks__/StripeProductRepositoryMock'
import { CreateStripeProductOnPostCreatedHandler } from '@Stripe/StripeProduct/application/CreateStripeProductOnPostCreated/CreateStripeProductOnPostCreatedHandler'
import { HttpStripeProductRepositoryMock } from '../../__mocks__/HttpStripeProductRepositoryMock'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { StripeProductMother } from '../../domain/StripeProductMother'
import { ProductType, ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'
import { PriceId } from '@Stripe/StripeProduct/domain/ValueObjects/PriceId'
import { StripeAccountMother } from '../../../StripeAccount/domain/StripeAccountMother'
import { StripeAccountResponse } from '@Stripe/StripeAccount/application/StripeAccountResponse'
import { PostMother } from '@Tests/Contexts/Posts/Post/domain/PostMother'
import { PostCreatedDomainEvent } from '@Posts/Post/domain/Events/PostCreatedDomainEvent'
import { StripeProductCreatedDomainEvent } from '@Stripe/StripeProduct/domain/Events/StripeProductCreatedDomainEvent'
import { Price as PostPrice, PriceCurrency, PriceValue } from '@Posts/Post/domain/ValueObjects/Price'
import { Price } from '@Stripe/StripeProduct/domain/ValueObjects/Price'
import { IsPaid } from '@Posts/Post/domain/ValueObjects/IsPaid'

let repository: StripeProductRepositoryMock
let creator: Creator
let handler: CreateStripeProductOnPostCreatedHandler
let httpRepository: HttpStripeProductRepositoryMock
let eventBus: EventBusMock
let queryBus: QueryBusMock

describe('CreateStripeProductOnPostCreated should', () => {
  beforeEach(() => {
    repository = new StripeProductRepositoryMock()
    httpRepository = new HttpStripeProductRepositoryMock()
    eventBus = new EventBusMock()
    queryBus = new QueryBusMock()
    creator = new Creator(repository, httpRepository, queryBus, eventBus)
    handler = new CreateStripeProductOnPostCreatedHandler(creator)
  })

  test('create a new post stripe product', async () => {
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

    const stripeProduct = StripeProductMother.create({
      productType: new ProductType(ProductTypes.POSTS),
      priceId: new PriceId('paymentId'),
      accountId: account.id,
      productId: post.id,
      id: post.id,
      name: post.title,
      price: new Price(String(post.price!.value))
    })

    const event = PostCreatedDomainEvent.fromAggregate(post)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(stripeProduct)
  })

  test('create a new StripeProductCreatedDomainEvent', async () => {
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

    const stripeProduct = StripeProductMother.create({
      productType: new ProductType(ProductTypes.POSTS),
      priceId: new PriceId('paymentId'),
      accountId: account.id,
      productId: post.id,
      id: post.id,
      name: post.title,
      price: new Price(String(post.price!.value))
    })

    const event = PostCreatedDomainEvent.fromAggregate(post)

    const expectedEvent = StripeProductCreatedDomainEvent.fromAggregate(stripeProduct)

    await handler.on(event)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
