import { FindSpaceByIdQueryHandler } from 'src/Contexts/Threads/Space/application/FindById/FindSpaceByIdQueryHandler'
import { FinderById } from 'src/Contexts/Threads/Space/application/FindById/FinderById'
import { SpaceRepositoryMock } from '../../__mocks__/SpaceRepositoryMock'
import { SpaceMother } from '../../domain/SpaceMother'
import { FindSpaceByIdQuery } from 'src/Contexts/Threads/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from 'src/Contexts/Threads/Space/application/SpaceResponse'
import { SpaceNotFound } from 'src/Contexts/Threads/Space/domain/Errors/SpaceNotFound'

let repository: SpaceRepositoryMock
let finder: FinderById
let handler: FindSpaceByIdQueryHandler

describe('FindSpaceByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new SpaceRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindSpaceByIdQueryHandler(finder)
  })

  test('Return a space', async () => {
    const space = SpaceMother.random()

    repository.returnOnFind(space)

    const query = new FindSpaceByIdQuery(space.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(space.id)
    expect(response).toEqual(new SpaceResponse(space))
  })

  test('Fail if a space doesnt exists', async () => {
    const space = SpaceMother.random()

    const query = new FindSpaceByIdQuery(space.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(SpaceNotFound)
  })
})
