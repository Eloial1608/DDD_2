import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { EventsUserRepositoryMock } from '../../__mocks__/EventUserRepositoryMock'
import { CreateEventsUserOnStripeSessionVerifiedHandler } from '@Events/EventsUser/application/CreateEventsUserOnStripeSessionVerified/CreateEventsUserOnStripeSessionVerifiedHandler'
import { Creator } from '@Events/EventsUser/application/CreateEventsUserOnStripeSessionVerified/Creator'
import { EventsUserMother } from '../../domain/EventUserMother'
import { StripeSessionMother } from '@Tests/Contexts/Stripe/StripeSession/domain/StripeSessionMother'
import { StripeSessionVerifiedDomainEvent } from '@Stripe/StripeSession/domain/Events/StripeSessionVerifiedDomainEvent'
import { EventsUserCreatedDomainEvent } from '@Events/EventsUser/domain/Events/EventsUserCreatedDomainEvent'
import { EventId } from '@Events/EventsUser/domain/ValueObjects/EventId'
import { ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'

let repository: EventsUserRepositoryMock
let eventBus: EventBusMock
let handler: CreateEventsUserOnStripeSessionVerifiedHandler
let creator: Creator

describe('CreateEventsUserOnStripeSessionVerifiedHandler should ', () => {
  beforeEach(() => {
    repository = new EventsUserRepositoryMock()
    eventBus = new EventBusMock()
    creator = new Creator(repository, eventBus)
    handler = new CreateEventsUserOnStripeSessionVerifiedHandler(creator)
  })

  test('Create a user plan', async () => {
    const stripeSession = StripeSessionMother.noNullProduct(ProductTypes.EVENTS)

    const event = StripeSessionVerifiedDomainEvent.fromAggregate(stripeSession)

    await handler.on(event)

    const expectedEventsUser = EventsUserMother.create({
      id: stripeSession.id,
      userId: stripeSession.customerId,
      eventId: new EventId(stripeSession.product.id)
    })

    repository.assertPersistHasBeenCalledWith(expectedEventsUser)
  })

  test('create a new EventsUserCreatedDomainEvent', async () => {
    const stripeSession = StripeSessionMother.noNullProduct(ProductTypes.EVENTS)

    const event = StripeSessionVerifiedDomainEvent.fromAggregate(stripeSession)

    await handler.on(event)

    const expectedEventsUser = EventsUserMother.create({
      id: stripeSession.id,
      userId: stripeSession.customerId,
      eventId: new EventId(stripeSession.product.id)
    })

    const expectedEvent = EventsUserCreatedDomainEvent.fromAggregate(expectedEventsUser)

    eventBus.assertLastPublishedEventIs(expectedEvent)
  })
})
