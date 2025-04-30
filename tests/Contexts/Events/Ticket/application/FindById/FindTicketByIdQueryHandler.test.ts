import { FindTicketByIdQueryHandler } from '@Events/Ticket/application/FindById/FindTicketByIdQueryHandler'
import { FinderById } from '@Events/Ticket/application/FindById/FinderById'
import { TicketRepositoryMock } from '../../__mocks__/TicketRepositoryMock'
import { TicketMother } from '../../domain/TicketMother'
import { FindTicketByIdQuery } from '@Events/Ticket/application/FindById/FindTicketByIdQuery'
import { TicketResponse } from '@Events/Ticket/application/TicketResponse'
import { TicketNotFound } from '@Events/Ticket/domain/Errors/TicketNotFound'

let repository: TicketRepositoryMock
let finder: FinderById
let handler: FindTicketByIdQueryHandler

describe('FindTicketByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new TicketRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindTicketByIdQueryHandler(finder)
  })

  test('Return a ticket', async () => {
    const ticket = TicketMother.random()

    repository.returnOnFind(ticket)

    const query = new FindTicketByIdQuery(ticket.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(ticket.id)
    expect(response).toEqual(new TicketResponse(ticket))
  })

  test('Fail if a ticket doesnt exists', async () => {
    const ticket = TicketMother.random()

    const query = new FindTicketByIdQuery(ticket.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(TicketNotFound)
  })
})
