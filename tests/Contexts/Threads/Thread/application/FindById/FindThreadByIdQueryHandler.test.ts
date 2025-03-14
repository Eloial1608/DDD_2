import { FindThreadByIdQueryHandler } from '@Threads/Thread/application/FindById/FindThreadByIdQueryHandler'
import { FinderById } from '@Threads/Thread/application/FindById/FinderById'
import { ThreadRepositoryMock } from '../../__mocks__/ThreadRepositoryMock'
import { ThreadMother } from '../../domain/ThreadMother'
import { FindThreadByIdQuery } from '@Threads/Thread/application/FindById/FindThreadByIdQuery'
import { ThreadResponse } from '@Threads/Thread/application/ThreadResponse'
import { ThreadNotFound } from '@Threads/Thread/domain/Errors/ThreadNotFound'

let repository: ThreadRepositoryMock
let finder: FinderById
let handler: FindThreadByIdQueryHandler

describe('FindThreadByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new ThreadRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindThreadByIdQueryHandler(finder)
  })

  test('Return a thread', async () => {
    const thread = ThreadMother.random()

    repository.returnOnFind(thread)

    const query = new FindThreadByIdQuery(thread.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(thread.id)
    expect(response).toEqual(new ThreadResponse(thread))
  })

  test('Fail if a thread doesnt exists', async () => {
    const thread = ThreadMother.random()

    const query = new FindThreadByIdQuery(thread.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(ThreadNotFound)
  })
})
