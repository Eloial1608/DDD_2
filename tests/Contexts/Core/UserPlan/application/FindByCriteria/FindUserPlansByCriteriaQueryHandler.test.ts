import { FindUserPlansByCriteriaQueryHandler } from '@Core/UserPlan/application/FindByCriteria/FindUserPlansByCriteriaQueryHandler'
import { FinderByCriteria } from '@Core/UserPlan/application/FindByCriteria/FinderByCriteria'
import { UserPlanRepositoryMock } from '../../__mocks__/UserPlanRepositoryMock'
import { UserPlanMother } from '../../domain/UserPlanMother'
import { FindUserPlansByCriteriaQuery } from '@Core/UserPlan/application/FindByCriteria/FindUserPlansByCriteriaQuery'
import { UserPlanCollectionResponse } from '@Core/UserPlan/application/UserPlanCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: UserPlanRepositoryMock
let finder: FinderByCriteria
let handler: FindUserPlansByCriteriaQueryHandler

describe('FindUserPlansByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new UserPlanRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindUserPlansByCriteriaQueryHandler(finder)
  })

  test('Return a userPlan collection', async () => {
    const userPlan = UserPlanMother.random()

    repository.returnOnSearch([userPlan])

    const query = new FindUserPlansByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new UserPlanCollectionResponse([userPlan]))
  })
})
