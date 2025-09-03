import { FindSpaceUserTitleByIdQueryHandler } from '@Core/SpaceUserTitle/application/FindById/FindSpaceUserTitleByIdQueryHandler'
import { FinderById } from '@Core/SpaceUserTitle/application/FindById/FinderById'
import { SpaceUserTitleRepositoryMock } from '../../__mocks__/SpaceUserTitleRepositoryMock'
import { SpaceUserTitleMother } from '../../domain/SpaceUserTitleMother'
import { FindSpaceUserTitleByIdQuery } from '@Core/SpaceUserTitle/application/FindById/FindSpaceUserTitleByIdQuery'
import { SpaceUserTitleResponse } from '@Core/SpaceUserTitle/application/SpaceUserTitleResponse'
import { SpaceUserTitleNotFound } from '@Core/SpaceUserTitle/domain/Errors/SpaceUserTitleNotFound'

let repository: SpaceUserTitleRepositoryMock
let finder: FinderById
let handler: FindSpaceUserTitleByIdQueryHandler

describe('FindSpaceUserTitleByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new SpaceUserTitleRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindSpaceUserTitleByIdQueryHandler(finder)
  })

  test('Return a spaceUserTitle', async () => {
    const spaceUserTitle = SpaceUserTitleMother.random()

    repository.returnOnFind(spaceUserTitle)

    const query = new FindSpaceUserTitleByIdQuery(spaceUserTitle.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(spaceUserTitle.id)
    expect(response).toEqual(new SpaceUserTitleResponse(spaceUserTitle))
  })

  test('Fail if a spaceUserTitle doesnt exists', async () => {
    const spaceUserTitle = SpaceUserTitleMother.random()

    const query = new FindSpaceUserTitleByIdQuery(spaceUserTitle.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(SpaceUserTitleNotFound)
  })
})