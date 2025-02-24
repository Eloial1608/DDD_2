import { Updater } from '@Stripe/StripeProduct/application/UpdateStripeProductOnSpaceUpdated/Updater'
import { StripeProductRepositoryMock } from '../../__mocks__/StripeProductRepositoryMock'
import { UpdateStripeProductOnSpaceUpdatedHandler } from '@Stripe/StripeProduct/application/UpdateStripeProductOnSpaceUpdated/UpdateStripeProductOnSpaceUpdatedHandler'
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
import { SpaceUpdatedDomainEvent } from '@Core/Space/domain/Events/SpaceUpdatedDomainEvent'
import { StripeProductUpdatedDomainEvent } from '@Stripe/StripeProduct/domain/Events/StripeProductUpdatedDomainEvent'
import { Accessibility } from '@Core/Space/domain/ValueObjects/Accessibility'
import { AllowedAccessibilities } from '@Shared/domain/SharedValueObjects/Space/SharedAccessibility'
import { Price as SpacePrice, PriceCurrency, PriceValue } from '@Core/Space/domain/ValueObjects/Price'
import { Price } from '@Stripe/StripeProduct/domain/ValueObjects/Price'

let repository: StripeProductRepositoryMock
let updater: Updater
let handler: UpdateStripeProductOnSpaceUpdatedHandler
let httpRepository: HttpStripeProductRepositoryMock
let eventBus: EventBusMock
let queryBus: QueryBusMock

describe('UpdateStripeProductOnSpaceUpdated should', () => {
  beforeEach(() => {
    repository = new StripeProductRepositoryMock()
    httpRepository = new HttpStripeProductRepositoryMock()
    eventBus = new EventBusMock()
    queryBus = new QueryBusMock()
    updater = new Updater(repository, httpRepository, queryBus, eventBus)
    handler = new UpdateStripeProductOnSpaceUpdatedHandler(updater)
  })

  test('update a space stripe product', async () => {
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

    const initialStripeProduct = StripeProductMother.create({
      productType: new ProductType(ProductTypes.SPACE),
      accountId: account.id,
      productId: space.id,
      id: space.id,
      name: space.name
    })

    repository.returnOnFind(initialStripeProduct)

    const stripeProduct = StripeProductMother.create({
      productType: new ProductType(ProductTypes.SPACE),
      priceId: new PriceId('paymentId'),
      accountId: account.id,
      productId: space.id,
      id: space.id,
      name: space.name,
      price: new Price(String(space.price!.value))
    })

    const event = SpaceUpdatedDomainEvent.fromAggregate(space)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(stripeProduct)
  })

  test('update a new StripeProductUpdatedDomainEvent', async () => {
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

    const initialStripeProduct = StripeProductMother.create({
      productType: new ProductType(ProductTypes.SPACE),
      accountId: account.id,
      productId: space.id,
      id: space.id,
      name: space.name
    })

    repository.returnOnFind(initialStripeProduct)

    const stripeProduct = StripeProductMother.create({
      productType: new ProductType(ProductTypes.SPACE),
      priceId: new PriceId('paymentId'),
      accountId: account.id,
      productId: space.id,
      id: space.id,
      name: space.name,
      price: new Price(String(space.price!.value))
    })

    const event = SpaceUpdatedDomainEvent.fromAggregate(space)

    const expectedEvent = StripeProductUpdatedDomainEvent.fromAggregate(stripeProduct)

    await handler.on(event)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
