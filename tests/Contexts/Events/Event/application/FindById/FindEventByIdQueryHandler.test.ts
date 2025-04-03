import { FindEventByIdQueryHandler } from '@Events/Event/application/FindById/FindEventByIdQueryHandler'
import { FinderById } from '@Events/Event/application/FindById/FinderById'
import { EventRepositoryMock } from '../../__mocks__/EventRepositoryMock'
import { EventMother } from '../../domain/EventMother'
import { FindEventByIdQuery } from '@Events/Event/application/FindById/FindEventByIdQuery'
import { EventResponse } from '@Events/Event/application/EventResponse'
import { EventNotFound } from '@Events/Event/domain/Errors/EventNotFound'

let repository: EventRepositoryMock
let finder: FinderById
let handler: FindEventByIdQueryHandler

describe('FindEventByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new EventRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindEventByIdQueryHandler(finder)
  })

  test('Return a event', async () => {
    const event = EventMother.random()

    repository.returnOnFind(event)

    const query = new FindEventByIdQuery(event.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(event.id)
    expect(response).toEqual(new EventResponse(event))
  })

  test('Fail if a event doesnt exists', async () => {
    const event = EventMother.random()

    const query = new FindEventByIdQuery(event.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(EventNotFound)
  })
})
