import { CreateTicketCommandHandler } from '@Events/Ticket/application/Create/CreateTicketCommandHandler'
import { Creator } from '@Events/Ticket/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { TicketRepositoryMock } from '../../__mocks__/TicketRepositoryMock'
import { TicketMother } from '../../domain/TicketMother'
import { CreateTicketCommandMother } from './CreateTicketCommandMother'
import { TicketCreatedDomainEvent } from '@Events/Ticket/domain/Events/TicketCreatedDomainEvent'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { EventMother } from '@Tests/Contexts/Events/Event/domain/EventMother'
import { FindEventByIdQuery } from '@Events/Event/application/FindById/FindEventByIdQuery'
import { EventResponse } from '@Events/Event/application/EventResponse'

let eventBus: EventBusMock
let repository: TicketRepositoryMock
let queryBus: QueryBusMock
let handler: CreateTicketCommandHandler
let creator: Creator

describe('CreateTicketCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new TicketRepositoryMock()
    queryBus = new QueryBusMock()
    creator = new Creator(repository, eventBus, queryBus)
    handler = new CreateTicketCommandHandler(creator)
  })

  test('Create a new ticket', async () => {
    const ticket = TicketMother.random()

    const event = EventMother.create({ id: ticket.eventId })

    queryBus.returnOnQuery(new FindEventByIdQuery(event.id.valueOf()), new EventResponse(event))

    const command = CreateTicketCommandMother.fromAggregate(ticket)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(ticket)
  })

  test('Fail if a ticket with the same id already exists', async () => {
    const ticket = TicketMother.random()

    const event = EventMother.create({ id: ticket.eventId })

    queryBus.returnOnQuery(new FindEventByIdQuery(event.id.valueOf()), new EventResponse(event))

    const command = CreateTicketCommandMother.fromAggregate(ticket)

    repository.returnOnFind(ticket)

    await handler.handle(command)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new TicketCreatedDomainEvent', async () => {
    const ticket = TicketMother.random()

    const event = EventMother.create({ id: ticket.eventId })

    queryBus.returnOnQuery(new FindEventByIdQuery(event.id.valueOf()), new EventResponse(event))

    const command = CreateTicketCommandMother.fromAggregate(ticket)

    await handler.handle(command)

    const expectedTicket = TicketCreatedDomainEvent.fromAggregate(ticket)

    eventBus.assertEventHasBeenPublished(expectedTicket)
  })
})
