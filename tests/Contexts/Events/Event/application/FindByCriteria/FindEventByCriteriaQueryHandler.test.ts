import { FindEventByCriteriaQueryHandler } from '@Events/Event/application/FindByCriteria/FindEventByCriteriaQueryHandler'
import { FinderByCriteria } from '@Events/Event/application/FindByCriteria/FinderByCriteria'
import { EventRepositoryMock } from '../../__mocks__/EventRepositoryMock'
import { EventMother } from '../../domain/EventMother'
import { FindEventByCriteriaQuery } from '@Events/Event/application/FindByCriteria/FindEventByCriteriaQuery'
import { EventCollectionResponse } from '@Events/Event/application/EventCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: EventRepositoryMock
let finder: FinderByCriteria
let handler: FindEventByCriteriaQueryHandler

describe('FindEventByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new EventRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindEventByCriteriaQueryHandler(finder)
  })

  test('Return a event collection', async () => {
    const event = EventMother.random()

    repository.returnOnSearch([event])

    const query = new FindEventByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new EventCollectionResponse([event]))
  })
})
