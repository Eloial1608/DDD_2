import { FindCalendarByIdQueryHandler } from '@Core/Calendar/application/FindById/FindCalendarByIdQueryHandler'
import { FinderById } from '@Core/Calendar/application/FindById/FinderById'
import { CalendarRepositoryMock } from '../../__mocks__/CalendarRepositoryMock'
import { CalendarMother } from '../../domain/CalendarMother'
import { FindCalendarByIdQuery } from '@Core/Calendar/application/FindById/FindCalendarByIdQuery'
import { CalendarResponse } from '@Core/Calendar/application/CalendarResponse'
import { CalendarNotFound } from '@Core/Calendar/domain/Errors/CalendarNotFound'

let repository: CalendarRepositoryMock
let finder: FinderById
let handler: FindCalendarByIdQueryHandler

describe('FindCalendarByIdQueryHandler should', () => {
  beforeEach(() => {
    repository = new CalendarRepositoryMock()
    finder = new FinderById(repository)
    handler = new FindCalendarByIdQueryHandler(finder)
  })

  test('Return a calendar', async () => {
    const calendar = CalendarMother.random()

    repository.returnOnFind(calendar)

    const query = new FindCalendarByIdQuery(calendar.id.valueOf())

    const response = await handler.handle(query)

    repository.assertFindHasBeenCalledWith(calendar.id)
    expect(response).toEqual(new CalendarResponse(calendar))
  })

  test('Fail if a calendar doesnt exists', async () => {
    const calendar = CalendarMother.random()

    const query = new FindCalendarByIdQuery(calendar.id.valueOf())

    expect(handler.handle(query)).rejects.toThrowError(CalendarNotFound)
  })
})
