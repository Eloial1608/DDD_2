import { FindActionsByCriteriaQueryHandler } from '@Marketplace/Action/application/FindByCriteria/FindActionsByCriteriaQueryHandler'
import { FinderByCriteria } from '@Marketplace/Action/application/FindByCriteria/FinderByCriteria'
import { ActionRepositoryMock } from '../../__mocks__/ActionRepositoryMock'
import { ActionMother } from '../../domain/ActionMother'
import { FindActionsByCriteriaQuery } from '@Marketplace/Action/application/FindByCriteria/FindActionsByCriteriaQuery'
import { ActionCollectionResponse } from '@Marketplace/Action/application/ActionCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: ActionRepositoryMock
let finder: FinderByCriteria
let handler: FindActionsByCriteriaQueryHandler

describe('FindActionsByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new ActionRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindActionsByCriteriaQueryHandler(finder)
  })

  test('Return a action collection', async () => {
    const action = ActionMother.random()

    repository.returnOnSearch([action])

    const query = new FindActionsByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new ActionCollectionResponse([action]))
  })
})
