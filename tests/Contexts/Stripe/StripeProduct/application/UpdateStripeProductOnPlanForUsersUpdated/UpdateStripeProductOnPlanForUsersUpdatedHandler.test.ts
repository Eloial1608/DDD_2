import { Updater } from '@Stripe/StripeProduct/application/UpdateStripeProductOnPlanForUsersUpdated/Updater'
import { StripeProductRepositoryMock } from '../../__mocks__/StripeProductRepositoryMock'
import { UpdateStripeProductOnPlanForUsersUpdatedHandler } from '@Stripe/StripeProduct/application/UpdateStripeProductOnPlanForUsersUpdated/UpdateStripeProductOnPlanForUsersUpdatedHandler'
import { HttpStripeProductRepositoryMock } from '../../__mocks__/HttpStripeProductRepositoryMock'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { StripeProductMother } from '../../domain/StripeProductMother'
import { ProductType, ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'
import { PriceId } from '@Stripe/StripeProduct/domain/ValueObjects/PriceId'
import { StripeAccountMother } from '../../../StripeAccount/domain/StripeAccountMother'
import { StripeAccountResponse } from '@Stripe/StripeAccount/application/StripeAccountResponse'
import { PlanForUsersMother } from '@Tests/Contexts/Core/PlanForUsers/domain/PlanForUsersMother'
import { PlanForUsersUpdatedDomainEvent } from '@Core/PlanForUsers/domain/Event/PlanForUsersUpdatedDomainEvent'
import { StripeProductUpdatedDomainEvent } from '@Stripe/StripeProduct/domain/Events/StripeProductUpdatedDomainEvent'
import { Price as PlanForUsersPrice, PriceCurrency, PriceValue } from '@Core/PlanForUsers/domain/ValueObjects/Price'
import { Price } from '@Stripe/StripeProduct/domain/ValueObjects/Price'

let repository: StripeProductRepositoryMock
let updater: Updater
let handler: UpdateStripeProductOnPlanForUsersUpdatedHandler
let httpRepository: HttpStripeProductRepositoryMock
let eventBus: EventBusMock
let queryBus: QueryBusMock

describe('UpdateStripeProductOnPlanForUsersUpdated should', () => {
  beforeEach(() => {
    repository = new StripeProductRepositoryMock()
    httpRepository = new HttpStripeProductRepositoryMock()
    eventBus = new EventBusMock()
    queryBus = new QueryBusMock()
    updater = new Updater(repository, httpRepository, queryBus, eventBus)
    handler = new UpdateStripeProductOnPlanForUsersUpdatedHandler(updater)
  })

  test('update a planforusers stripe product', async () => {
    const account = StripeAccountMother.random()

    queryBus.returnOnAsk(new StripeAccountResponse(account))

    const planforusers = PlanForUsersMother.create({
      communityId: account.id,
      price: new PlanForUsersPrice(
        new PriceValue(100),
        new PriceCurrency('EUR')
      )
    })

    const initialStripeProduct = StripeProductMother.create({
      productType: new ProductType(ProductTypes.USER_PLANS),
      accountId: account.id,
      productId: planforusers.id,
      id: planforusers.id,
      name: planforusers.name
    })

    repository.returnOnFind(initialStripeProduct)

    const stripeProduct = StripeProductMother.create({
      productType: new ProductType(ProductTypes.USER_PLANS),
      priceId: new PriceId('paymentId'),
      accountId: account.id,
      productId: planforusers.id,
      id: planforusers.id,
      name: planforusers.name,
      renovationInterval: planforusers.renovationInterval,
      renovationType: planforusers.renovationType,
      price: new Price(String(planforusers.price.value!))
    })

    const event = PlanForUsersUpdatedDomainEvent.fromAggregate(planforusers)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(stripeProduct)
  })

  test('update a new StripeProductUpdatedDomainEvent', async () => {
    const account = StripeAccountMother.random()

    queryBus.returnOnAsk(new StripeAccountResponse(account))

    const planforusers = PlanForUsersMother.create({
      communityId: account.id,
      price: new PlanForUsersPrice(
        new PriceValue(100),
        new PriceCurrency('EUR')
      )
    })

    const initialStripeProduct = StripeProductMother.create({
      productType: new ProductType(ProductTypes.USER_PLANS),
      accountId: account.id,
      productId: planforusers.id,
      id: planforusers.id,
      name: planforusers.name
    })

    repository.returnOnFind(initialStripeProduct)

    const stripeProduct = StripeProductMother.create({
      productType: new ProductType(ProductTypes.USER_PLANS),
      priceId: new PriceId('paymentId'),
      accountId: account.id,
      productId: planforusers.id,
      id: planforusers.id,
      name: planforusers.name,
      renovationInterval: planforusers.renovationInterval,
      renovationType: planforusers.renovationType,
      price: new Price(String(planforusers.price!.value))
    })

    const event = PlanForUsersUpdatedDomainEvent.fromAggregate(planforusers)

    const expectedEvent = StripeProductUpdatedDomainEvent.fromAggregate(stripeProduct)

    await handler.on(event)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
