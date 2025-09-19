import { FindLevelByIdQueryHandler } from '@Core/Level/application/FindById/FindLevelByIdQueryHandler'
import { FinderById } from '@Core/Level/application/FindById/FinderById'
import { LevelRepositoryMock } from '../../__mocks__/LevelRepositoryMock'
import { LevelMother } from '../../domain/LevelMother'
import { FindLevelByIdQuery } from '@Core/Level/application/FindById/FindLevelByIdQuery'
import { LevelResponse } from '@Core/Level/application/LevelResponse'
import { LevelNotFound } from '@Core/Level/domain/Errors/LevelNotFound'

let repository: LevelRepositoryMock
let finder: FinderById
let handler: FindLevelByIdQueryHandler

describe('FindLevelByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new LevelRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindLevelByIdQueryHandler(finder)
  })

  test('Return a level', async () => {
    const level = LevelMother.random()

    repository.returnOnFind(level)

    const query = new FindLevelByIdQuery(level.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(level.id)
    expect(response).toEqual(new LevelResponse(level))
  })

  test('Fail if a level doesnt exists', async () => {
    const level = LevelMother.random()

    const query = new FindLevelByIdQuery(level.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(LevelNotFound)
  })
})
