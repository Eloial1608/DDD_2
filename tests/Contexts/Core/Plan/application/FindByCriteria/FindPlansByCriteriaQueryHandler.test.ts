import { FindPlansByCriteriaQueryHandler } from '@Core/Plan/application/FindByCriteria/FindPlansByCriteriaQueryHandler'
import { FinderByCriteria } from '@Core/Plan/application/FindByCriteria/FinderByCriteria'
import { PlanRepositoryMock } from '../../__mocks__/PlanRepositoryMock'
import { PlanMother } from '../../domain/PlanMother'
import { FindPlansByCriteriaQuery } from '@Core/Plan/application/FindByCriteria/FindPlansByCriteriaQuery'
import { PlanCollectionResponse } from '@Core/Plan/application/PlanCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: PlanRepositoryMock
let finder: FinderByCriteria
let handler: FindPlansByCriteriaQueryHandler

describe('FindPlansByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new PlanRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindPlansByCriteriaQueryHandler(finder)
  })

  test('Return a plan collection', async () => {
    const plan = PlanMother.random()

    repository.returnOnSearch([plan])

    const query = new FindPlansByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new PlanCollectionResponse([plan]))
  })
})
