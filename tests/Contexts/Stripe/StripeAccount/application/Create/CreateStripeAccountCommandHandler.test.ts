import { CreateStripeAccountCommandHandler } from '@Stripe/StripeAccount/application/Create/CreateStripeAccountCommandHandler'
import { Creator } from '@Stripe/StripeAccount/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { StripeAccountRepositoryMock } from '../../__mocks__/StripeAccountRepositoryMock'
import { StripeAccountMother } from '../../domain/StripeAccountMother'
import { CreateStripeAccountCommandMother } from './CreateStripeAccountCommandMother'
import { StripeAccountCreatedDomainEvent } from '@Stripe/StripeAccount/domain/Events/StripeAccountCreatedDomainEvent'
import { HttpStripeAccountRepositoryMock } from '../../__mocks__/HttpStripeAccountRepositoryMock'
import { StripeAccountAlreadyExists } from '@Stripe/StripeAccount/domain/Errors/StripeAccountAlreadyExists'

let eventBus: EventBusMock
let repository: StripeAccountRepositoryMock
let stripeRepository: HttpStripeAccountRepositoryMock
let handler: CreateStripeAccountCommandHandler
let creator: Creator

describe('CreateStripeAccountCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new StripeAccountRepositoryMock()
    stripeRepository = new HttpStripeAccountRepositoryMock()
    creator = new Creator(repository, stripeRepository, eventBus)
    handler = new CreateStripeAccountCommandHandler(creator)
  })

  test('Create a new stripeAccount', async () => {
    const stripeAccount = StripeAccountMother.random()

    const command = CreateStripeAccountCommandMother.fromAggregate(stripeAccount)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(stripeAccount)
  })

  test('Fail if a stripeAccount with the same id already exists', async () => {
    const stripeAccount = StripeAccountMother.random()
    const existingStripeAccount = StripeAccountMother.create({ id: stripeAccount.id })

    const command = CreateStripeAccountCommandMother.fromAggregate(stripeAccount)

    repository.returnOnFind(existingStripeAccount)

    expect(handler.handle(command)).rejects.toThrow(StripeAccountAlreadyExists)
  })

  test('Create a new StripeAccountCreatedDomainEvent', async () => {
    const stripeAccount = StripeAccountMother.random()

    const command = CreateStripeAccountCommandMother.fromAggregate(stripeAccount)

    await handler.handle(command)

    const expectedEvent = StripeAccountCreatedDomainEvent.fromAggregate(stripeAccount)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
