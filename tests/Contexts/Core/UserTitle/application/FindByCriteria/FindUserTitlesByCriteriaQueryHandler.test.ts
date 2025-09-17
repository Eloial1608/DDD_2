import { FindUserTitlesByCriteriaQueryHandler } from '@Core/UserTitle/application/FindByCriteria/FindUserTitlesByCriteriaQueryHandler'
import { FinderByCriteria } from '@Core/UserTitle/application/FindByCriteria/FinderByCriteria'
import { UserTitleRepositoryMock } from '../../__mocks__/UserTitleRepositoryMock'
import { UserTitleMother } from '../../domain/UserTitleMother'
import { FindUserTitlesByCriteriaQuery } from '@Core/UserTitle/application/FindByCriteria/FindUserTitlesByCriteriaQuery'
import { UserTitleCollectionResponse } from '@Core/UserTitle/application/UserTitleCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: UserTitleRepositoryMock
let finder: FinderByCriteria
let handler: FindUserTitlesByCriteriaQueryHandler

describe('FindUserTitlesByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new UserTitleRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindUserTitlesByCriteriaQueryHandler(finder)
  })

  test('Return a userTitle collection', async () => {
    const userTitle = UserTitleMother.random()

    repository.returnOnSearch([userTitle])

    const query = new FindUserTitlesByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new UserTitleCollectionResponse([userTitle]))
  })
})
