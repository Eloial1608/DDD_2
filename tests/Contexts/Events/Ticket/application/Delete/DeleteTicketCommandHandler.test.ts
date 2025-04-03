import { DeleteTicketCommandHandler } from '@Events/Ticket/application/Delete/DeleteTicketCommandHandler'
import { Deleter } from '@Events/Ticket/application/Delete/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { TicketRepositoryMock } from '../../__mocks__/TicketRepositoryMock'
import { TicketMother } from '../../domain/TicketMother'
import { DeleteTicketCommandMother } from './DeleteTicketCommandMother'
import { TicketDeletedDomainEvent } from '@Events/Ticket/domain/Events/TicketDeletedDomainEvent'
import { DeletedAt } from '@Events/Ticket/domain/ValueObjects/DeletedAt'

let eventBus: EventBusMock
let repository: TicketRepositoryMock
let handler: DeleteTicketCommandHandler
let deleter: Deleter

describe('DeleteTicketCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new TicketRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteTicketCommandHandler(deleter)
  })

  test('Delete a new ticket', async () => {
    const ticket = TicketMother.random()

    repository.returnOnFind(ticket)

    const command = DeleteTicketCommandMother.fromAggregate(ticket)

    await handler.handle(command)

    const expected = TicketMother.create({
      ...ticket,
      deletedAt: new DeletedAt(new Date())
    })

    repository.assertPersistHasBeenCalledWith(expected)
  })

  test('Fail if a ticket with the same id doesnt exists', async () => {
    const ticket = TicketMother.random()

    const command = DeleteTicketCommandMother.fromAggregate(ticket)

    await handler.handle(command)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new TicketDeletedDomainEvent', async () => {
    const ticket = TicketMother.random()

    repository.returnOnFind(ticket)

    const command = DeleteTicketCommandMother.fromAggregate(ticket)

    await handler.handle(command)

    const expected = TicketMother.create({
      ...ticket,
      deletedAt: new DeletedAt(new Date())
    })

    const expectedTicket = TicketDeletedDomainEvent.fromAggregate(expected)

    eventBus.assertEventHasBeenPublished(expectedTicket)
  })
})
