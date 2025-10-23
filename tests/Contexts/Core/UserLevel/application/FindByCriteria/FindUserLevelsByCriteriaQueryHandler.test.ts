import { FindUserLevelsByCriteriaQueryHandler } from '@Core/UserLevel/application/FindByCriteria/FindUserLevelsByCriteriaQueryHandler'
import { FinderByCriteria } from '@Core/UserLevel/application/FindByCriteria/FinderByCriteria'
import { UserLevelRepositoryMock } from '../../__mocks__/UserLevelRepositoryMock'
import { UserLevelMother } from '../../domain/UserLevelMother'
import { FindUserLevelsByCriteriaQuery } from '@Core/UserLevel/application/FindByCriteria/FindUserLevelsByCriteriaQuery'
import { UserLevelCollectionResponse } from '@Core/UserLevel/application/UserLevelCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: UserLevelRepositoryMock
let finder: FinderByCriteria
let handler: FindUserLevelsByCriteriaQueryHandler

describe('FindUserLevelsByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new UserLevelRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindUserLevelsByCriteriaQueryHandler(finder)
  })

  test('Return a userlevel collection', async () => {
    const userlevel = UserLevelMother.random()

    repository.returnOnSearch([userlevel])

    const query = new FindUserLevelsByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new UserLevelCollectionResponse([userlevel]))
  })
})
