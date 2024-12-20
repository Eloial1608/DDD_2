import { UpdateStripeAccountCommandHandler } from '@Stripe/StripeAccount/application/Update/UpdateStripeAccountCommandHandler'
import { Updater } from '@Stripe/StripeAccount/application/Update/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { StripeAccountRepositoryMock } from '../../__mocks__/StripeAccountRepositoryMock'
import { StripeAccountMother } from '../../domain/StripeAccountMother'
import { UpdateStripeAccountCommandMother } from './UpdateStripeAccountCommandMother'
import { StripeAccountUpdatedDomainEvent } from '@Stripe/StripeAccount/domain/Events/StripeAccountUpdatedDomainEvent'
import { HttpStripeAccountRepositoryMock } from '../../__mocks__/HttpStripeAccountRepositoryMock'
import { StripeAccountNotFound } from '@Stripe/StripeAccount/domain/Errors/StripeAccountNotFound'

let eventBus: EventBusMock
let repository: StripeAccountRepositoryMock
let stripeRepository: HttpStripeAccountRepositoryMock
let handler: UpdateStripeAccountCommandHandler
let updater: Updater

describe('UpdateStripeAccountCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new StripeAccountRepositoryMock()
    stripeRepository = new HttpStripeAccountRepositoryMock()
    updater = new Updater(repository, stripeRepository, eventBus)
    handler = new UpdateStripeAccountCommandHandler(updater)
  })

  test('Update a new stripeAccount', async () => {
    const stripeAccount = StripeAccountMother.random()
    const existingStripeAccount = StripeAccountMother.create({ id: stripeAccount.id })

    repository.returnOnFind(existingStripeAccount)

    const command = UpdateStripeAccountCommandMother.fromAggregate(stripeAccount)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(stripeAccount)
  })

  test('Fail if a stripeAccount with the same id already exists', async () => {
    const stripeAccount = StripeAccountMother.random()

    const command = UpdateStripeAccountCommandMother.fromAggregate(stripeAccount)

    expect(handler.handle(command)).rejects.toThrow(StripeAccountNotFound)
  })

  test('Update a new StripeAccountUpdatedDomainEvent', async () => {
    const stripeAccount = StripeAccountMother.random()

    const existingStripeAccount = StripeAccountMother.create({ id: stripeAccount.id })

    repository.returnOnFind(existingStripeAccount)

    const command = UpdateStripeAccountCommandMother.fromAggregate(stripeAccount)

    await handler.handle(command)

    const expectedEvent = StripeAccountUpdatedDomainEvent.fromAggregate(stripeAccount)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
