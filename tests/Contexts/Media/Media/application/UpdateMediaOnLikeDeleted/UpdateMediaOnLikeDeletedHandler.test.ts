import { UpdateMediaOnLikeDeletedHandler } from '@Media/Media/application/UpdateMediaOnLikeDeleted/UpdateMediaOnLikeDeletedHandler'
import { Updater } from '@Media/Media/application/UpdateMediaOnLikeDeleted/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { MediaRepositoryMock } from '../../__mocks__/MediaRepositoryMock'
import { MediaMother } from '../../domain/MediaMother'
import { LikeMother } from '@Tests/Contexts/Media/Like/domain/LikeMother'
import { LikeDeletedDomainEvent } from '@Media/Like/domain/Events/LikeDeletedDomainEvent'
import { MediaTotalLikesUpdatedDomainEvent } from '@Media/Media/domain/Events/MediaTotalLikesUpdatedDomainEvent'

let eventBus: EventBusMock
let repository: MediaRepositoryMock
let handler: UpdateMediaOnLikeDeletedHandler
let updater: Updater

describe('UpdateMediaOnLikeDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new MediaRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateMediaOnLikeDeletedHandler(updater)
  })

  test('Update a media', async () => {
    const media = MediaMother.random()

    const like = LikeMother.random()

    repository.returnOnFind(media)

    const event = LikeDeletedDomainEvent.fromAggregate(like)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(media)
  })

  test('Create a new MediaTotalLikesUpdatedDomainEvent', async () => {
    const media = MediaMother.random()

    const like = LikeMother.random()

    repository.returnOnFind(media)

    const event = LikeDeletedDomainEvent.fromAggregate(like)

    await handler.on(event)

    const expectedEvent = MediaTotalLikesUpdatedDomainEvent.fromAggregate(media)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
