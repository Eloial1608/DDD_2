import { UpdateThreadOnLikeDeletedHandler } from '@Threads/Thread/application/UpdateThreadOnLikeDeleted/UpdateThreadOnLikeDeletedHandler'
import { Updater } from '@Threads/Thread/application/UpdateThreadOnLikeDeleted/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { ThreadRepositoryMock } from '../../__mocks__/ThreadRepositoryMock'
import { ThreadMother } from '../../domain/ThreadMother'
import { LikeMother } from '@Tests/Contexts/Threads/Like/domain/LikeMother'
import { LikeDeletedDomainEvent } from '@Threads/Like/domain/Events/LikeDeletedDomainEvent'
import { ThreadTotalLikesUpdatedDomainEvent } from '@Threads/Thread/domain/Events/ThreadTotalLikesUpdatedDomainEvent'

let eventBus: EventBusMock
let repository: ThreadRepositoryMock
let handler: UpdateThreadOnLikeDeletedHandler
let updater: Updater

describe('UpdateThreadOnLikeDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new ThreadRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateThreadOnLikeDeletedHandler(updater)
  })

  test('Update a thread', async () => {
    const thread = ThreadMother.random()

    const like = LikeMother.random()

    repository.returnOnFind(thread)

    const event = LikeDeletedDomainEvent.fromAggregate(like)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(thread)
  })

  test('Create a new ThreadTotalLikesUpdatedDomainEvent', async () => {
    const thread = ThreadMother.random()

    const like = LikeMother.random()

    repository.returnOnFind(thread)

    const event = LikeDeletedDomainEvent.fromAggregate(like)

    await handler.on(event)

    const expectedEvent = ThreadTotalLikesUpdatedDomainEvent.fromAggregate(thread)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
