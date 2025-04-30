import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { EventUserRepositoryMock } from '../../__mocks__/EventUserRepositoryMock'
import { CreateEventUserOnStripeSessionVerifiedHandler } from '@Events/EventUser/application/CreateEventUserOnStripeSessionVerified/CreateEventUserOnStripeSessionVerifiedHandler'
import { Creator } from '@Events/EventUser/application/CreateEventUserOnStripeSessionVerified/Creator'
import { EventUserMother } from '../../domain/EventUserMother'
import { StripeSessionMother } from '@Tests/Contexts/Stripe/StripeSession/domain/StripeSessionMother'
import { StripeSessionVerifiedDomainEvent } from '@Stripe/StripeSession/domain/Events/StripeSessionVerifiedDomainEvent'
import { EventUserCreatedDomainEvent } from '@Events/EventUser/domain/Events/EventUserCreatedDomainEvent'
import { EventId } from '@Events/EventUser/domain/ValueObjects/EventId'
import { ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { TicketMother } from '@Tests/Contexts/Events/Ticket/domain/TicketMother'
import { Id } from '@Events/Ticket/domain/ValueObjects/Id'
import { TicketResponse } from '@Events/Ticket/application/TicketResponse'

let repository: EventUserRepositoryMock
let eventBus: EventBusMock
let queryBus: QueryBusMock
let handler: CreateEventUserOnStripeSessionVerifiedHandler
let creator: Creator

describe('CreateEventUserOnStripeSessionVerifiedHandler should ', () => {
  beforeEach(() => {
    repository = new EventUserRepositoryMock()
    eventBus = new EventBusMock()
    queryBus = new QueryBusMock()
    creator = new Creator(repository, eventBus, queryBus)
    handler = new CreateEventUserOnStripeSessionVerifiedHandler(creator)
  })

  test('Create a user plan', async () => {
    const stripeSession = StripeSessionMother.noNullProduct(ProductTypes.EVENTS)

    const ticket = TicketMother.create({ id: new Id(stripeSession.product.id) })

    const event = StripeSessionVerifiedDomainEvent.fromAggregate(stripeSession)

    queryBus.returnOnAsk(new TicketResponse(ticket))

    await handler.on(event)

    const expectedEventUser = EventUserMother.create({
      id: stripeSession.id,
      userId: stripeSession.customerId,
      eventId: new EventId(ticket.eventId.valueOf()),
      ticketId: ticket.id
    })

    repository.assertPersistHasBeenCalledWith(expectedEventUser)
  })

  test('create a new EventUserCreatedDomainEvent', async () => {
    const stripeSession = StripeSessionMother.noNullProduct(ProductTypes.EVENTS)

    const ticket = TicketMother.create({ id: new Id(stripeSession.product.id) })

    const event = StripeSessionVerifiedDomainEvent.fromAggregate(stripeSession)

    queryBus.returnOnAsk(new TicketResponse(ticket))

    await handler.on(event)

    const expectedEventUser = EventUserMother.create({
      id: stripeSession.id,
      userId: stripeSession.customerId,
      eventId: new EventId(ticket.eventId.valueOf()),
      ticketId: ticket.id
    })

    const expectedEvent = EventUserCreatedDomainEvent.fromAggregate(expectedEventUser)

    eventBus.assertLastPublishedEventIs(expectedEvent)
  })
})
