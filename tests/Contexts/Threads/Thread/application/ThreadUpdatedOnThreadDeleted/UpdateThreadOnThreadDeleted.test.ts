import { Updater } from '@Threads/Thread/application/UpdateThreadOnThreadDeleted/Updater'
import { UpdateThreadOnThreadDeletedHandler } from '@Threads/Thread/application/UpdateThreadOnThreadDeleted/UpdateThreadOnThreadDeletedHandler'
import { ThreadRepositoryMock } from '../../__mocks__/ThreadRepositoryMock'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { ThreadMother } from '../../domain/ThreadMother'
import { ThreadDeletedDomainEvent } from '@Threads/Thread/domain/Events/ThreadDeletedDomainEvent'
import { ThreadTotalThreadsUpdatedDomainEvent } from '@Threads/Thread/domain/Events/ThreadTotalThreadsUpdatedDomainEvent'

let eventBus: EventBusMock
let repository: ThreadRepositoryMock
let handler: UpdateThreadOnThreadDeletedHandler
let updater: Updater

describe('UpdateThreadOnThreadDeleted should', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new ThreadRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateThreadOnThreadDeletedHandler(updater)
  })

  test('Update a thread', async () => {
    const thread = ThreadMother.random()

    const deletedThread = ThreadMother.create({ parentThreadId: thread.id })

    repository.returnOnFind(thread)

    const event = ThreadDeletedDomainEvent.fromAggregate(deletedThread)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(thread)
  })

  test(' Create a new ThreadTotalThreadsUpdatedDomainEvent', async () => {
    const thread = ThreadMother.random()

    const deletedThread = ThreadMother.create({ parentThreadId: thread.id })

    repository.returnOnFind(thread)

    const event = ThreadDeletedDomainEvent.fromAggregate(deletedThread)

    await handler.on(event)

    const expectedEvent = ThreadTotalThreadsUpdatedDomainEvent.fromAggregate(thread)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
