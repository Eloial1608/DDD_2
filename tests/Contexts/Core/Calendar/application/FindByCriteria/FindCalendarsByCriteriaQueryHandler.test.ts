import { FindCalendarsByCriteriaQueryHandler } from '@Core/Calendar/application/FindByCriteria/FindCalendarsByCriteriaQueryHandler'
import { FinderByCriteria } from '@Core/Calendar/application/FindByCriteria/FinderByCriteria'
import { CalendarRepositoryMock } from '../../__mocks__/CalendarRepositoryMock'
import { CalendarMother } from '../../domain/CalendarMother'
import { FindCalendarsByCriteriaQuery } from '@Core/Calendar/application/FindByCriteria/FindCalendarsByCriteriaQuery'
import { CalendarCollectionResponse } from '@Core/Calendar/application/CalendarCollectionResponse'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

let repository: CalendarRepositoryMock
let finder: FinderByCriteria
let handler: FindCalendarsByCriteriaQueryHandler

describe('FindCalendarsByCriteriaQueryHandler should', () => {
  beforeEach(() => {
    repository = new CalendarRepositoryMock()
    finder = new FinderByCriteria(repository)
    handler = new FindCalendarsByCriteriaQueryHandler(finder)
  })

  test('Return a calendar collection', async () => {
    const calendar = CalendarMother.random()

    repository.returnOnSearch([calendar])

    const query = new FindCalendarsByCriteriaQuery()

    const response = await handler.handle(query)

    repository.assertSearchHasBeenCalledWith(new Criteria())
    expect(response).toEqual(new CalendarCollectionResponse([calendar]))
  })
})
