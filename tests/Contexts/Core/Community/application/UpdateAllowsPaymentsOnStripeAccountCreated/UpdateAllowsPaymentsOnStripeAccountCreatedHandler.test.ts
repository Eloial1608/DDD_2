import { UpdateAllowsPaymentsOnStripeAccountCreatedHandler } from '@Core/Community/application/UpdateAllowsPaymentsOnStripeAccountCreated/UpdateAllowsPaymentsOnStripeAccountCreatedHandler'
import { Updater } from '@Core/Community/application/UpdateAllowsPaymentsOnStripeAccountCreated/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { CommunityRepositoryMock } from '../../__mocks__/CommunityRepositoryMock'
import { CommunityAllowsPaymentsUpdatedDomainEvent } from '@Core/Community/domain/Events/CommunityAllowsPaymentsUpdatedDomainEvent'
import { CommunityMother } from '@Tests/Contexts/Core/Community/domain/CommunityMother'
import { StripeAccountCreatedDomainEvent } from '@Stripe/StripeAccount/domain/Events/StripeAccountCreatedDomainEvent'
import { StripeAccountMother } from '@Tests/Contexts/Stripe/StripeAccount/domain/StripeAccountMother'
import { AllowsPayments } from '@Core/Community/domain/ValueObjects/AllowsPayments'

let eventBus: EventBusMock
let repository: CommunityRepositoryMock
let handler: UpdateAllowsPaymentsOnStripeAccountCreatedHandler
let updater: Updater

describe('UpdateAllowsPaymentsOnStripeAccountCreatedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new CommunityRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateAllowsPaymentsOnStripeAccountCreatedHandler(updater)
  })

  test('Update community', async () => {
    const existingCommunity = CommunityMother.random()

    repository.returnOnFind(existingCommunity)

    const stripeAccount = StripeAccountMother.create({
      id: existingCommunity.id
    })

    const event = StripeAccountCreatedDomainEvent.fromAggregate(stripeAccount)

    await handler.on(event)

    const expectedCommunity = CommunityMother.create({
      ...existingCommunity,
      allowsPayments: new AllowsPayments(true)
    })

    repository.assertPersistHasBeenCalledWith(expectedCommunity)
  })

  test('create a new CommunityAllowsPaymentsUpdatedDomainEvent', async () => {
    const existingCommunity = CommunityMother.random()

    repository.returnOnFind(existingCommunity)

    const stripeAccount = StripeAccountMother.create({
      id: existingCommunity.id
    })

    const event = StripeAccountCreatedDomainEvent.fromAggregate(stripeAccount)

    await handler.on(event)

    const expectedCommunity = CommunityMother.create({
      ...existingCommunity,
      allowsPayments: new AllowsPayments(true)
    })

    const expectedEvent = CommunityAllowsPaymentsUpdatedDomainEvent.fromAggregate(expectedCommunity)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
