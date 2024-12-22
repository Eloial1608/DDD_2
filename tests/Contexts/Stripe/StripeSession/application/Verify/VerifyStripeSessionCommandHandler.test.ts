import { VerifyStripeSessionCommandHandler } from '@Stripe/StripeSession/application/Verify/VerifyStripeSessionCommandHandler'
import { Verificator } from '@Stripe/StripeSession/application/Verify/Verificator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { StripeSessionRepositoryMock } from '../../__mocks__/StripeSessionRepositoryMock'
import { StripeSessionMother } from '../../domain/StripeSessionMother'
import { VerifyStripeSessionCommandMother } from './VerifyStripeSessionCommandMother'
import { StripeSessionVerifiedDomainEvent } from '@Stripe/StripeSession/domain/Events/StripeSessionVerifiedDomainEvent'
import { HttpStripeSessionRepositoryMock } from '../../__mocks__/HttpStripeSessionRepositoryMock'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { StripeAccountMother } from '@Tests/Contexts/Stripe/StripeAccount/domain/StripeAccountMother'
import { StripeAccountResponse } from '@Stripe/StripeAccount/application/StripeAccountResponse'
import { Completed } from '@Stripe/StripeSession/domain/ValueObjects/Completed'
import { StripeSessionNotFound } from '@Stripe/StripeSession/domain/Errors/StripeSessionNotFound'

let eventBus: EventBusMock
let repository: StripeSessionRepositoryMock
let queryBus: QueryBusMock
let stripeRepository: HttpStripeSessionRepositoryMock
let handler: VerifyStripeSessionCommandHandler
let verificator: Verificator

describe('VerifyStripeSessionCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new StripeSessionRepositoryMock()
    stripeRepository = new HttpStripeSessionRepositoryMock()
    queryBus = new QueryBusMock()
    verificator = new Verificator(repository, stripeRepository, queryBus, eventBus)
    handler = new VerifyStripeSessionCommandHandler(verificator)
  })

  test('Verify a stripeSession', async () => {
    const stripeSession = StripeSessionMother.random()

    const stripeAccount = StripeAccountMother.create({
      id: stripeSession.accountId
    })

    queryBus.returnOnAsk(new StripeAccountResponse(stripeAccount))

    repository.returnOnFind(stripeSession)

    const command = VerifyStripeSessionCommandMother.fromAggregate(stripeSession)

    await handler.handle(command)

    const expectedStripeSession = StripeSessionMother.create({
      ...stripeSession,
      completed: new Completed(true)
    })

    repository.assertPersistHasBeenCalledWith(expectedStripeSession)
  })

  test('Fail if a stripeSession was not found', async () => {
    const stripeSession = StripeSessionMother.random()

    const stripeAccount = StripeAccountMother.create({
      id: stripeSession.accountId
    })

    queryBus.returnOnAsk(new StripeAccountResponse(stripeAccount))

    const command = VerifyStripeSessionCommandMother.fromAggregate(stripeSession)

    expect(handler.handle(command)).rejects.toThrow(StripeSessionNotFound)
  })

  test('Verify a new StripeSessionVerifydDomainEvent', async () => {
    const stripeSession = StripeSessionMother.random()

    const stripeAccount = StripeAccountMother.create({
      id: stripeSession.accountId
    })

    queryBus.returnOnAsk(new StripeAccountResponse(stripeAccount))

    repository.returnOnFind(stripeSession)

    const command = VerifyStripeSessionCommandMother.fromAggregate(stripeSession)

    await handler.handle(command)

    const expectedStripeSession = StripeSessionMother.create({
      ...stripeSession,
      completed: new Completed(true)
    })

    const expectedEvent = StripeSessionVerifiedDomainEvent.fromAggregate(expectedStripeSession)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
