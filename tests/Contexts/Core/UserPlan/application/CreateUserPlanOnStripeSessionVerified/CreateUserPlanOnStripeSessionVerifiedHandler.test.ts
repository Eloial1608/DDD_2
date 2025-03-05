import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserPlanRepositoryMock } from '../../__mocks__/UserPlanRepositoryMock'
import { CreateUserPlanOnStripeSessionVerifiedHandler } from '@Core/UserPlan/application/CreateUserPlanOnStripeSessionVerified/CreateUserPlanOnStripeSessionVerifiedHandler'
import { Creator } from '@Core/UserPlan/application/CreateUserPlanOnStripeSessionVerified/Creator'
import { UserPlanMother } from '../../domain/UserPlanMother'
import { StripeSessionMother } from '@Tests/Contexts/Stripe/StripeSession/domain/StripeSessionMother'
import { StripeSessionVerifiedDomainEvent } from '@Stripe/StripeSession/domain/Events/StripeSessionVerifiedDomainEvent'
import { Name } from '@Core/UserPlan/domain/ValueObjects/Name'
import { Price, PriceCurrency, PriceValue } from '@Core/UserPlan/domain/ValueObjects/Price'
import { PlanId } from '@Core/UserPlan/domain/ValueObjects/PlanId'
import { RenovationInterval } from '@Core/UserPlan/domain/ValueObjects/RenovationInterval'
import { RenovationType } from '@Core/UserPlan/domain/ValueObjects/RenovationType'
import { RenovationTypeValues } from '@Shared/domain/SharedValueObjects/SharedRenovationType'
import { ExpiresAt } from '@Core/UserPlan/domain/ValueObjects/ExpiresAt'
import { UserPlanCreatedDomainEvent } from '@Core/UserPlan/domain/Events/UserPlanCreatedDomainEvent'

let repository: UserPlanRepositoryMock
let eventBus: EventBusMock
let handler: CreateUserPlanOnStripeSessionVerifiedHandler
let creator: Creator

describe('CreateUserPlanOnStripeSessionVerifiedHandler should ', () => {
  beforeEach(() => {
    repository = new UserPlanRepositoryMock()
    eventBus = new EventBusMock()
    creator = new Creator(repository, eventBus)
    handler = new CreateUserPlanOnStripeSessionVerifiedHandler(creator)
  })

  test('Create a user plan', async () => {
    const stripeSession = StripeSessionMother.noNullProduct()

    const event = StripeSessionVerifiedDomainEvent.fromAggregate(stripeSession)

    await handler.on(event)

    const expiresAt = new Date()
    expiresAt.setMonth(expiresAt.getMonth() + stripeSession.product.renovationInterval!)

    const expectedUserPlan = UserPlanMother.create({
      id: stripeSession.customerId,
      name: new Name(stripeSession.product.name),
      planId: new PlanId(stripeSession.product.id),
      price: new Price(new PriceValue(Number(stripeSession.price.valueOf())), new PriceCurrency('€')),
      renovationInterval: new RenovationInterval(stripeSession.product.renovationInterval!),
      renovationType: new RenovationType(stripeSession.product.renovationType! as RenovationTypeValues),
      expiresAt: new ExpiresAt(expiresAt)
    })

    repository.assertPersistHasBeenCalledWith(expectedUserPlan)
  })

  test('create a new UserPlanCreatedDomainEvent', async () => {
    const stripeSession = StripeSessionMother.noNullProduct()

    const event = StripeSessionVerifiedDomainEvent.fromAggregate(stripeSession)

    await handler.on(event)

    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30)

    const expectedUserPlan = UserPlanMother.create({
      id: stripeSession.customerId,
      name: new Name(stripeSession.product.name),
      planId: new PlanId(stripeSession.product.id),
      price: new Price(new PriceValue(Number(stripeSession.price.valueOf())), new PriceCurrency('€')),
      renovationInterval: new RenovationInterval(stripeSession.product.renovationInterval!),
      renovationType: new RenovationType(stripeSession.product.renovationType! as RenovationTypeValues),
      expiresAt: new ExpiresAt(expiresAt)
    })

    const expectedEvent = UserPlanCreatedDomainEvent.fromAggregate(expectedUserPlan)

    eventBus.assertLastPublishedEventIs(expectedEvent)
  })
})
