import { FindEventsUsersByCriteriaQueryHandler } from '@Events/EventsUser/application/FindByCriteria/FindEventsUsersByCriteriaQueryHandler'
import { FinderByCriteria } from '@Events/EventsUser/application/FindByCriteria/FinderByCriteria'
import { EventsUserRepositoryMock } from '../../__mocks__/EventUserRepositoryMock'
import { EventsUserMother } from '../../domain/EventUserMother'
import { FindEventsUsersByCriteriaQuery } from '@Events/EventsUser/application/FindByCriteria/FindEventsUsersByCriteriaQuery'
import { EventsUserCollectionResponse } from '@Events/EventsUser/application/EventsUserCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: EventsUserRepositoryMock
let finder: FinderByCriteria
let handler: FindEventsUsersByCriteriaQueryHandler

describe('FindEventsUsersByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new EventsUserRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindEventsUsersByCriteriaQueryHandler(finder)
  })

  test('Return a eventsUser collection', async () => {
    const eventsUser = EventsUserMother.random()

    repository.returnOnSearch([eventsUser])

    const query = new FindEventsUsersByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new EventsUserCollectionResponse([eventsUser]))
  })
})
