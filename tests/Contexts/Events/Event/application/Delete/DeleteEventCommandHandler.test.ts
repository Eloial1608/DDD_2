import { DeleteEventCommandHandler } from '@Events/Event/application/Delete/DeleteEventCommandHandler'
import { Deleter } from '@Events/Event/application/Delete/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { EventRepositoryMock } from '../../__mocks__/EventRepositoryMock'
import { EventMother } from '../../domain/EventMother'
import { DeleteEventCommandMother } from './DeleteEventCommandMother'
import { EventDeletedDomainEvent } from '@Events/Event/domain/Events/EventDeletedDomainEvent'
import { DeletedAt } from '@Events/Event/domain/ValueObjects/DeletedAt'

let eventBus: EventBusMock
let repository: EventRepositoryMock
let handler: DeleteEventCommandHandler
let deleter: Deleter

describe('DeleteEventCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new EventRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteEventCommandHandler(deleter)
  })

  test('Delete a event', async () => {
    const event = EventMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = EventMother.create({ ...event, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteEventCommandMother.fromAggregate(event)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(event)
  })

  test('Create a new EventDeletedDomainEvent', async () => {
    const event = EventMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = EventMother.create({ ...event, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteEventCommandMother.fromAggregate(event)

    await handler.handle(command)

    const expectedEvent = EventDeletedDomainEvent.fromAggregate(event)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
