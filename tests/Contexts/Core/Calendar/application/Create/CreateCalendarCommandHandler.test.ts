import { CreateCalendarCommandHandler } from '@Core/Calendar/application/Create/CreateCalendarCommandHandler'
import { Creator } from '@Core/Calendar/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { CalendarRepositoryMock } from '../../__mocks__/CalendarRepositoryMock'
import { CalendarMother } from '../../domain/CalendarMother'
import { CreateCalendarCommandMother } from './CreateCalendarCommandMother'
import { CalendarCreatedDomainEvent } from '@Core/Calendar/domain/Events/CalendarCreatedDomainEvent'

let eventBus: EventBusMock
let repository: CalendarRepositoryMock
let handler: CreateCalendarCommandHandler
let creator: Creator

describe('CreateCalendarCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new CalendarRepositoryMock()
    creator = new Creator(repository, eventBus)
    handler = new CreateCalendarCommandHandler(creator)
  })

  test('Create a new calendar', async () => {
    const calendar = CalendarMother.random()

    const command = CreateCalendarCommandMother.fromAggregate(calendar)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(calendar)
  })

  test('Create a new CalendarCreatedDomainEvent', async () => {
    const calendar = CalendarMother.random()

    const command = CreateCalendarCommandMother.fromAggregate(calendar)

    await handler.handle(command)

    const expectedEvent = CalendarCreatedDomainEvent.fromAggregate(calendar)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
