import { FindUserLevelByIdQueryHandler } from '@Core/UserLevel/application/FindById/FindUserLevelByIdQueryHandler'
import { FinderById } from '@Core/UserLevel/application/FindById/FinderById'
import { UserLevelRepositoryMock } from '../../__mocks__/UserLevelRepositoryMock'
import { UserLevelMother } from '../../domain/UserLevelMother'
import { FindUserLevelByIdQuery } from '@Core/UserLevel/application/FindById/FindUserLevelByIdQuery'
import { UserLevelResponse } from '@Core/UserLevel/application/UserLevelResponse'
import { UserLevelNotFound } from '@Core/UserLevel/domain/Errors/UserLevelNotFound'

let repository: UserLevelRepositoryMock
let finder: FinderById
let handler: FindUserLevelByIdQueryHandler

describe('FindUserLevelByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new UserLevelRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindUserLevelByIdQueryHandler(finder)
  })

  test('Return a userlevel', async () => {
    const userlevel = UserLevelMother.random()

    repository.returnOnFind(userlevel)

    const query = new FindUserLevelByIdQuery(userlevel.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(userlevel.id)
    expect(response).toEqual(new UserLevelResponse(userlevel))
  })

  test('Fail if a userlevel doesnt exists', async () => {
    const userlevel = UserLevelMother.random()

    const query = new FindUserLevelByIdQuery(userlevel.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(UserLevelNotFound)
  })
})
