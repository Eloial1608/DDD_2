import { FindPlanForUsersByCriteriaQueryHandler } from '@Core/PlanForUsers/application/FindByCriteria/FindPlanForUsersByCriteriaQueryHandler'
import { FinderByCriteria } from '@Core/PlanForUsers/application/FindByCriteria/FinderByCriteria'
import { PlanForUsersRepositoryMock } from '../../__mocks__/PlanForUsersRepositoryMock'
import { PlanForUsersMother } from '../../domain/PlanForUsersMother'
import { FindPlanForUsersByCriteriaQuery } from '@Core/PlanForUsers/application/FindByCriteria/FindPlanForUsersByCriteriaQuery'
import { PlanForUsersCollectionResponse } from '@Core/PlanForUsers/application/PlanForUsersCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: PlanForUsersRepositoryMock
let finder: FinderByCriteria
let handler: FindPlanForUsersByCriteriaQueryHandler

describe('FindPlanForUsersByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new PlanForUsersRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindPlanForUsersByCriteriaQueryHandler(finder)
  })

  test('Return a planForUsers collection', async () => {
    const planForUsers = PlanForUsersMother.random()

    repository.returnOnSearch([planForUsers])

    const query = new FindPlanForUsersByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new PlanForUsersCollectionResponse([planForUsers]))
  })
})
