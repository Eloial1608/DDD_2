import { Updater } from "@Threads/Thread/application/UpdateThreadOnThreadCreated/Updater"
import { UpdateThreadOnThreadCreatedHandler } from "@Threads/Thread/application/UpdateThreadOnThreadCreated/UpdateThreadOnThreadCreatedHandler"
import { ThreadRepositoryMock } from "../../__mocks__/ThreadRepositoryMock"
import EventBusMock from "@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock"
import { ThreadMother } from "../../domain/ThreadMother"
import { ThreadCreatedDomainEvent } from "@Threads/Thread/domain/Events/ThreadCreatedDomainEvent"
import { ThreadTotalThreadsUpdatedDomainEvent } from "@Threads/Thread/domain/Events/ThreadTotalThreadsUpdatedDomainEvent"
import { TotalThreads } from "@Threads/Thread/domain/ValueObjects/TotalThreads"

let eventBus: EventBusMock
let repository: ThreadRepositoryMock
let handler: UpdateThreadOnThreadCreatedHandler
let updater: Updater

describe('UpdateThreadOnThreadCreated should', () =>{
     beforeEach(() => {
        eventBus = new EventBusMock()
        repository = new ThreadRepositoryMock()
        updater = new Updater(repository, eventBus)
        handler = new UpdateThreadOnThreadCreatedHandler(updater)
      })

      test('Update a thread', async () =>{
      const thread = ThreadMother.random()

      const createdThread = ThreadMother.create({parentThreadId: thread.id})

      const  expectedThread = ThreadMother.create({
        ...thread,
        totalThreads: new TotalThreads(thread.totalThreads.valueOf() + 1)
      })

      repository.returnOnFind(thread)

      const event = ThreadCreatedDomainEvent.fromAggregate(createdThread)

      await handler.on(event)

      repository.assertPersistHasBeenCalledWith(expectedThread)
      })

      test(' Create a new ThreadTotalThreadsUpdatedDomainEvent', async () =>{
      const thread = ThreadMother.random()

      const createdThread = ThreadMother.create({parentThreadId: thread.id})

      const  expectedThread = ThreadMother.create({
        ...thread,
        totalThreads: new TotalThreads(thread.totalThreads.valueOf() + 1)
      })

      repository.returnOnFind(thread)

      const event = ThreadCreatedDomainEvent.fromAggregate(createdThread)

      await handler.on(event)

      const expectedEvent = ThreadTotalThreadsUpdatedDomainEvent.fromAggregate(expectedThread)

      eventBus.assertEventHasBeenPublished(expectedEvent)
      })
})
