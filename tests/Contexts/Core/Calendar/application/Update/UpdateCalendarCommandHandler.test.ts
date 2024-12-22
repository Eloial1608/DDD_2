import { UpdateCalendarCommandHandler } from '@Core/Calendar/application/Update/UpdateCalendarCommandHandler'
import { Updater } from '@Core/Calendar/application/Update/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { CalendarRepositoryMock } from '../../__mocks__/CalendarRepositoryMock'
import { CalendarMother } from '../../domain/CalendarMother'
import { UpdateCalendarCommandMother } from './UpdateCalendarCommandMother'
import { CalendarUpdatedDomainEvent } from '@Core/Calendar/domain/Events/CalendarUpdatedDomainEvent'

let eventBus: EventBusMock
let repository: CalendarRepositoryMock
let handler: UpdateCalendarCommandHandler
let updater: Updater

describe('UpdateCalendarCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new CalendarRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateCalendarCommandHandler(updater)
  })

  test('Update a calendar', async () => {
    const calendar = CalendarMother.random()

    const command = UpdateCalendarCommandMother.fromAggregate(calendar)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(calendar)
  })

  test('Update a new CalendarUpdatedDomainEvent', async () => {
    const calendar = CalendarMother.random()

    const command = UpdateCalendarCommandMother.fromAggregate(calendar)

    await handler.handle(command)

    const expectedEvent = CalendarUpdatedDomainEvent.fromAggregate(calendar)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
