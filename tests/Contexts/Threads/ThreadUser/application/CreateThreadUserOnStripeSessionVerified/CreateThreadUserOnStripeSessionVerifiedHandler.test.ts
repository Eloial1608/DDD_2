import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { ThreadUserRepositoryMock } from '../../__mocks__/ThreadUserRepositoryMock'
import { CreateThreadUserOnStripeSessionVerifiedHandler } from '@Threads/ThreadUser/application/CreateThreadUserOnStripeSessionVerified/CreateThreadUserOnStripeSessionVerifiedHandler'
import { Creator } from '@Threads/ThreadUser/application/CreateThreadUserOnStripeSessionVerified/Creator'
import { ThreadUserMother } from '../../domain/ThreadUserMother'
import { StripeSessionMother } from '@Tests/Contexts/Stripe/StripeSession/domain/StripeSessionMother'
import { StripeSessionVerifiedDomainEvent } from '@Stripe/StripeSession/domain/Events/StripeSessionVerifiedDomainEvent'
import { ThreadUserCreatedDomainEvent } from '@Threads/ThreadUser/domain/Events/ThreadUserCreatedDomainEvent'
import { ThreadId } from '@Threads/ThreadUser/domain/ValueObjects/ThreadId'
import { ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'

let repository: ThreadUserRepositoryMock
let eventBus: EventBusMock
let handler: CreateThreadUserOnStripeSessionVerifiedHandler
let creator: Creator

describe('CreateThreadUserOnStripeSessionVerifiedHandler should ', () => {
  beforeEach(() => {
    repository = new ThreadUserRepositoryMock()
    eventBus = new EventBusMock()
    creator = new Creator(repository, eventBus)
    handler = new CreateThreadUserOnStripeSessionVerifiedHandler(creator)
  })

  test('Create a user plan', async () => {
    const stripeSession = StripeSessionMother.noNullProduct(ProductTypes.THREADS)

    const event = StripeSessionVerifiedDomainEvent.fromAggregate(stripeSession)

    await handler.on(event)

    const expectedThreadUser = ThreadUserMother.create({
      id: stripeSession.id,
      userId: stripeSession.customerId,
      threadId: new ThreadId(stripeSession.product.id)
    })

    repository.assertPersistHasBeenCalledWith(expectedThreadUser)
  })

  test('create a new ThreadUserCreatedDomainEvent', async () => {
    const stripeSession = StripeSessionMother.noNullProduct(ProductTypes.THREADS)

    const event = StripeSessionVerifiedDomainEvent.fromAggregate(stripeSession)

    await handler.on(event)

    const expectedThreadUser = ThreadUserMother.create({
      id: stripeSession.id,
      userId: stripeSession.customerId,
      threadId: new ThreadId(stripeSession.product.id)
    })

    const expectedEvent = ThreadUserCreatedDomainEvent.fromAggregate(expectedThreadUser)

    eventBus.assertLastPublishedEventIs(expectedEvent)
  })
})
