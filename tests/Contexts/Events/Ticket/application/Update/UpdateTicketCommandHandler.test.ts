import { UpdateTicketCommandHandler } from '@Events/Ticket/application/Update/UpdateTicketCommandHandler'
import { Updater } from '@Events/Ticket/application/Update/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { TicketRepositoryMock } from '../../__mocks__/TicketRepositoryMock'
import { TicketMother } from '../../domain/TicketMother'
import { UpdateTicketCommandMother } from './UpdateTicketCommandMother'
import { TicketUpdatedDomainEvent } from '@Events/Ticket/domain/Events/TicketUpdatedDomainEvent'

let eventBus: EventBusMock
let repository: TicketRepositoryMock
let handler: UpdateTicketCommandHandler
let updater: Updater

describe('UpdateTicketCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new TicketRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateTicketCommandHandler(updater)
  })

  test('Update a new ticket', async () => {
    const ticket = TicketMother.random()

    repository.returnOnFind(ticket)

    const command = UpdateTicketCommandMother.fromAggregate(ticket)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(ticket)
  })

  test('Fail if a ticket with the same id doesnt exists', async () => {
    const ticket = TicketMother.random()

    const command = UpdateTicketCommandMother.fromAggregate(ticket)

    await handler.handle(command)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new TicketUpdatedDomainEvent', async () => {
    const ticket = TicketMother.random()

    repository.returnOnFind(ticket)

    const command = UpdateTicketCommandMother.fromAggregate(ticket)

    await handler.handle(command)

    const expectedTicket = TicketUpdatedDomainEvent.fromAggregate(ticket)

    eventBus.assertEventHasBeenPublished(expectedTicket)
  })
})
