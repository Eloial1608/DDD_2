import { DeleteCalendarCommandHandler } from '@Core/Calendar/application/Delete/DeleteCalendarCommandHandler'
import { Deleter } from '@Core/Calendar/application/Delete/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { CalendarRepositoryMock } from '../../__mocks__/CalendarRepositoryMock'
import { CalendarMother } from '../../domain/CalendarMother'
import { DeleteCalendarCommandMother } from './DeleteCalendarCommandMother'
import { CalendarDeletedDomainEvent } from '@Core/Calendar/domain/Events/CalendarDeletedDomainEvent'

let eventBus: EventBusMock
let repository: CalendarRepositoryMock
let handler: DeleteCalendarCommandHandler
let deleter: Deleter

describe('DeleteCalendarCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new CalendarRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteCalendarCommandHandler(deleter)
  })

  test('Delete a new calendar', async () => {
    const calendar = CalendarMother.random()

    repository.returnOnFind(calendar)

    const command = DeleteCalendarCommandMother.fromAggregate(calendar)

    await handler.handle(command)

    repository.assertDeleteHasBeenCalledWith(calendar)
  })

  test('Delete a new CalendarDeletedDomainEvent', async () => {
    const calendar = CalendarMother.random()

    repository.returnOnFind(calendar)

    const command = DeleteCalendarCommandMother.fromAggregate(calendar)

    await handler.handle(command)

    const expectedEvent = CalendarDeletedDomainEvent.fromAggregate(calendar)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
