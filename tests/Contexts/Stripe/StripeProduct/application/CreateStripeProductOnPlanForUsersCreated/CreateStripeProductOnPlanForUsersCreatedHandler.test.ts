import { Creator } from '@Stripe/StripeProduct/application/CreateStripeProductOnPlanForUsersCreated/Creator'
import { StripeProductRepositoryMock } from '../../__mocks__/StripeProductRepositoryMock'
import { CreateStripeProductOnPlanForUsersCreatedHandler } from '@Stripe/StripeProduct/application/CreateStripeProductOnPlanForUsersCreated/CreateStripeProductOnPlanForUsersCreatedHandler'
import { HttpStripeProductRepositoryMock } from '../../__mocks__/HttpStripeProductRepositoryMock'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { StripeProductMother } from '../../domain/StripeProductMother'
import { ProductType, ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'
import { PriceId } from '@Stripe/StripeProduct/domain/ValueObjects/PriceId'
import { StripeAccountMother } from '../../../StripeAccount/domain/StripeAccountMother'
import { StripeAccountResponse } from '@Stripe/StripeAccount/application/StripeAccountResponse'
import { PlanForUsersMother } from '@Tests/Contexts/Core/PlanForUsers/domain/PlanForUsersMother'
import { PlanForUsersCreatedDomainEvent } from '@Core/PlanForUsers/domain/Event/PlanForUsersCreatedDomainEvent'
import { StripeProductCreatedDomainEvent } from '@Stripe/StripeProduct/domain/Events/StripeProductCreatedDomainEvent'
import { Price as PlanForUsersPrice, PriceCurrency, PriceValue } from '@Core/PlanForUsers/domain/ValueObjects/Price'
import { Price } from '@Stripe/StripeProduct/domain/ValueObjects/Price'

let repository: StripeProductRepositoryMock
let creator: Creator
let handler: CreateStripeProductOnPlanForUsersCreatedHandler
let httpRepository: HttpStripeProductRepositoryMock
let eventBus: EventBusMock
let queryBus: QueryBusMock

describe('CreateStripeProductOnPlanForUsersCreated should', () => {
  beforeEach(() => {
    repository = new StripeProductRepositoryMock()
    httpRepository = new HttpStripeProductRepositoryMock()
    eventBus = new EventBusMock()
    queryBus = new QueryBusMock()
    creator = new Creator(repository, httpRepository, queryBus, eventBus)
    handler = new CreateStripeProductOnPlanForUsersCreatedHandler(creator)
  })

  test('create a new planforusers stripe product', async () => {
    const account = StripeAccountMother.random()

    queryBus.returnOnAsk(new StripeAccountResponse(account))

    const planforusers = PlanForUsersMother.create({
      communityId: account.id,
      price: new PlanForUsersPrice(
        new PriceValue(100),
        new PriceCurrency('EUR')
      )
    })

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

    const event = PlanForUsersCreatedDomainEvent.fromAggregate(planforusers)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(stripeProduct)
  })

  test('create a new StripeProductCreatedDomainEvent', async () => {
    const account = StripeAccountMother.random()

    queryBus.returnOnAsk(new StripeAccountResponse(account))

    const planforusers = PlanForUsersMother.create({
      communityId: account.id,
      price: new PlanForUsersPrice(
        new PriceValue(100),
        new PriceCurrency('EUR')
      )
    })

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

    const event = PlanForUsersCreatedDomainEvent.fromAggregate(planforusers)

    const expectedEvent = StripeProductCreatedDomainEvent.fromAggregate(stripeProduct)

    await handler.on(event)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
