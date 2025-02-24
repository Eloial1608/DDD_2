import { Creator } from '@Stripe/StripeProduct/application/CreateStripeProductOnSpaceCreated/Creator'
import { StripeProductRepositoryMock } from '../../__mocks__/StripeProductRepositoryMock'
import { CreateStripeProductOnSpaceCreatedHandler } from '@Stripe/StripeProduct/application/CreateStripeProductOnSpaceCreated/CreateStripeProductOnSpaceCreatedHandler'
import { HttpStripeProductRepositoryMock } from '../../__mocks__/HttpStripeProductRepositoryMock'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { StripeProductMother } from '../../domain/StripeProductMother'
import { ProductType, ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'
import { PriceId } from '@Stripe/StripeProduct/domain/ValueObjects/PriceId'
import { StripeAccountMother } from '../../../StripeAccount/domain/StripeAccountMother'
import { StripeAccountResponse } from '@Stripe/StripeAccount/application/StripeAccountResponse'
import { SpaceMother } from '@Tests/Contexts/Core/Space/domain/SpaceMother'
import { Type } from '@Core/Space/domain/ValueObjects/Type'
import { AllowedTypes } from '@Shared/domain/SharedValueObjects/Space/AllowedTypes'
import { SpaceCreatedDomainEvent } from '@Core/Space/domain/Events/SpaceCreatedDomainEvent'
import { StripeProductCreatedDomainEvent } from '@Stripe/StripeProduct/domain/Events/StripeProductCreatedDomainEvent'
import { Accessibility } from '@Core/Space/domain/ValueObjects/Accessibility'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'
import { Price as SpacePrice, PriceCurrency, PriceValue } from '@Core/Space/domain/ValueObjects/Price'
import { Price } from '@Stripe/StripeProduct/domain/ValueObjects/Price'

let repository: StripeProductRepositoryMock
let creator: Creator
let handler: CreateStripeProductOnSpaceCreatedHandler
let httpRepository: HttpStripeProductRepositoryMock
let eventBus: EventBusMock
let queryBus: QueryBusMock

describe('CreateStripeProductOnSpaceCreated should', () => {
  beforeEach(() => {
    repository = new StripeProductRepositoryMock()
    httpRepository = new HttpStripeProductRepositoryMock()
    eventBus = new EventBusMock()
    queryBus = new QueryBusMock()
    creator = new Creator(repository, httpRepository, queryBus, eventBus)
    handler = new CreateStripeProductOnSpaceCreatedHandler(creator)
  })

  test('create a new space stripe product', async () => {
    const account = StripeAccountMother.random()

    queryBus.returnOnAsk(new StripeAccountResponse(account))

    const space = SpaceMother.create({
      communityId: account.id,
      type: new Type(AllowedTypes.POST),
      accessibility: new Accessibility(AllowedAccessibilities.PAYMENT),
      price: new SpacePrice(
        new PriceValue(100),
        new PriceCurrency('EUR')
      )
    })

    const stripeProduct = StripeProductMother.create({
      productType: new ProductType(ProductTypes.SPACE),
      priceId: new PriceId('paymentId'),
      accountId: account.id,
      productId: space.id,
      id: space.id,
      name: space.name,
      price: new Price(String(space.price!.value))
    })

    const event = SpaceCreatedDomainEvent.fromAggregate(space)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(stripeProduct)
  })

  test('create a new StripeProductCreatedDomainEvent', async () => {
    const account = StripeAccountMother.random()

    queryBus.returnOnAsk(new StripeAccountResponse(account))

    const space = SpaceMother.create({
      communityId: account.id,
      type: new Type(AllowedTypes.POST),
      accessibility: new Accessibility(AllowedAccessibilities.PAYMENT),
      price: new SpacePrice(
        new PriceValue(100),
        new PriceCurrency('EUR')
      )
    })

    const stripeProduct = StripeProductMother.create({
      productType: new ProductType(ProductTypes.SPACE),
      priceId: new PriceId('paymentId'),
      accountId: account.id,
      productId: space.id,
      id: space.id,
      name: space.name,
      price: new Price(String(space.price!.value))
    })

    const event = SpaceCreatedDomainEvent.fromAggregate(space)

    const expectedEvent = StripeProductCreatedDomainEvent.fromAggregate(stripeProduct)

    await handler.on(event)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
