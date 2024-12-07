import { FindUserByIdQueryHandler } from '@Core/User/application/FindById/FindUserByIdQueryHandler'
import { FinderById } from '@Core/User/application/FindById/FinderById'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UserMother } from '../../domain/UserMother'
import { FindUserByIdQuery } from '@Core/User/application/FindById/FindUserByIdQuery'
import { UserResponse } from '@Core/User/application/UserResponse'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'

let repository: UserRepositoryMock
let finder: FinderById
let handler: FindUserByIdQueryHandler

describe('FindUserByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new UserRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindUserByIdQueryHandler(finder)
  })

  test('Return a user', async () => {
    const user = UserMother.random()

    repository.returnOnFind(user)

    const query = new FindUserByIdQuery(user.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(user.id)
    expect(response).toEqual(new UserResponse(user))
  })

  test('Fail if a user doesnt exists', async () => {
    const user = UserMother.random()

    const query = new FindUserByIdQuery(user.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(UserNotFound)
  })
})
