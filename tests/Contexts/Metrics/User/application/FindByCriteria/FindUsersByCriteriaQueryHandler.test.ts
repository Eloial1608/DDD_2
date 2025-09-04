import { FindUsersByCriteriaQueryHandler } from '@Metrics/User/application/FindByCriteria/FindUsersByCriteriaQueryHandler'
import { FinderByCriteria } from '@Metrics/User/application/FindByCriteria/FinderByCriteria'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UserMother } from '../../domain/UserMother'
import { FindUsersByCriteriaQuery } from '@Metrics/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Metrics/User/application/UserCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: UserRepositoryMock
let finder: FinderByCriteria
let handler: FindUsersByCriteriaQueryHandler

describe('FindUsersByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new UserRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindUsersByCriteriaQueryHandler(finder)
  })

  test('Return a user collection', async () => {
    const user = UserMother.random()

    repository.returnOnSearch([user])

    const query = new FindUsersByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new UserCollectionResponse([user]))
  })
})
