import { FindUserTitleByIdQueryHandler } from '@Core/UserTitle/application/FindById/FindUserTitleByIdQueryHandler'
import { FinderById } from '@Core/UserTitle/application/FindById/FinderById'
import { UserTitleRepositoryMock } from '../../__mocks__/UserTitleRepositoryMock'
import { UserTitleMother } from '../../domain/UserTitleMother'
import { FindUserTitleByIdQuery } from '@Core/UserTitle/application/FindById/FindUserTitleByIdQuery'
import { UserTitleResponse } from '@Core/UserTitle/application/UserTitleResponse'
import { UserTitleNotFound } from '@Core/UserTitle/domain/Errors/UserTitleNotFound'

let repository: UserTitleRepositoryMock
let finder: FinderById
let handler: FindUserTitleByIdQueryHandler

describe('FindUserTitleByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new UserTitleRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindUserTitleByIdQueryHandler(finder)
  })

  test('Return a userTitle', async () => {
    const userTitle = UserTitleMother.random()

    repository.returnOnFind(userTitle)

    const query = new FindUserTitleByIdQuery(userTitle.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(userTitle.id)
    expect(response).toEqual(new UserTitleResponse(userTitle))
  })

  test('Fail if a userTitle doesnt exists', async () => {
    const userTitle = UserTitleMother.random()

    const query = new FindUserTitleByIdQuery(userTitle.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(UserTitleNotFound)
  })
})
