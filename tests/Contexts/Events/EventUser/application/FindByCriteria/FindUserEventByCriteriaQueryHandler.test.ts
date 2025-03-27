import { FindEventUsersByCriteriaQueryHandler } from '@Events/EventUser/application/FindByCriteria/FindEventUsersByCriteriaQueryHandler'
import { FinderByCriteria } from '@Events/EventUser/application/FindByCriteria/FinderByCriteria'
import { EventUserRepositoryMock } from '../../__mocks__/EventUserRepositoryMock'
import { EventUserMother } from '../../domain/EventUserMother'
import { FindEventUsersByCriteriaQuery } from '@Events/EventUser/application/FindByCriteria/FindEventUsersByCriteriaQuery'
import { EventUserCollectionResponse } from '@Events/EventUser/application/EventUserCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: EventUserRepositoryMock
let finder: FinderByCriteria
let handler: FindEventUsersByCriteriaQueryHandler

describe('FindEventUsersByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new EventUserRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindEventUsersByCriteriaQueryHandler(finder)
  })

  test('Return a eventUser collection', async () => {
    const eventUser = EventUserMother.random()

    repository.returnOnSearch([eventUser])

    const query = new FindEventUsersByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new EventUserCollectionResponse([eventUser]))
  })
})
