import { UpdateThreadOnLikeCreatedHandler } from '@Threads/Thread/application/UpdateThreadOnLikeCreated/UpdateThreadOnLikeCreatedHandler'
import { Updater } from '@Threads/Thread/application/UpdateThreadOnLikeCreated/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { ThreadRepositoryMock } from '../../__mocks__/ThreadRepositoryMock'
import { ThreadMother } from '../../domain/ThreadMother'
import { LikeMother } from '@Tests/Contexts/Threads/Like/domain/LikeMother'
import { LikeCreatedDomainEvent } from '@Threads/Like/domain/Events/LikeCreatedDomainEvent'
import { ThreadTotalLikesUpdatedDomainEvent } from '@Threads/Thread/domain/Events/ThreadTotalLikesUpdatedDomainEvent'
import { TotalLikes } from '@Threads/Thread/domain/ValueObjects/TotalLikes'

let eventBus: EventBusMock
let repository: ThreadRepositoryMock
let handler: UpdateThreadOnLikeCreatedHandler
let updater: Updater

describe('UpdateThreadOnLikeCreatedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new ThreadRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateThreadOnLikeCreatedHandler(updater)
  })

  test('Update a thread', async () => {
    const thread = ThreadMother.random()

    const like = LikeMother.random()

    const expectedThread = ThreadMother.create({
      ...thread,
      totalLikes: new TotalLikes(thread.totalLikes.valueOf() + 1)
    })

    repository.returnOnFind(thread)

    const event = LikeCreatedDomainEvent.fromAggregate(like)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(expectedThread)
  })

  test('Create a new ThreadTotalLikesUpdatedDomainEvent', async () => {
    const thread = ThreadMother.random()

    const like = LikeMother.random()

    repository.returnOnFind(thread)

    const event = LikeCreatedDomainEvent.fromAggregate(like)

    await handler.on(event)

    const expectedThread = ThreadMother.create({
      ...thread,
      totalLikes: new TotalLikes(thread.totalLikes.valueOf() + 1)
    })

    const expectedEvent = ThreadTotalLikesUpdatedDomainEvent.fromAggregate(expectedThread)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
