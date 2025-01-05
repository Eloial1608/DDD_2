import { UpdateMediaOnLikeCreatedHandler } from '@Media/Media/application/UpdateMediaOnLikeCreated/UpdateMediaOnLikeCreatedHandler'
import { Updater } from '@Media/Media/application/UpdateMediaOnLikeCreated/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { MediaRepositoryMock } from '../../__mocks__/MediaRepositoryMock'
import { MediaMother } from '../../domain/MediaMother'
import { LikeMother } from '@Tests/Contexts/Media/Like/domain/LikeMother'
import { LikeCreatedDomainEvent } from '@Media/Like/domain/Events/LikeCreatedDomainEvent'
import { MediaTotalLikesUpdatedDomainEvent } from '@Media/Media/domain/Events/MediaTotalLikesUpdatedDomainEvent'
import { TotalLikes } from '@Media/Media/domain/ValueObjects/TotalLikes'

let eventBus: EventBusMock
let repository: MediaRepositoryMock
let handler: UpdateMediaOnLikeCreatedHandler
let updater: Updater

describe('UpdateMediaOnLikeCreatedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new MediaRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateMediaOnLikeCreatedHandler(updater)
  })

  test('Update a media', async () => {
    const media = MediaMother.random()

    const like = LikeMother.random()

    const expectedMedia = MediaMother.create({
      ...media,
      totalLikes: new TotalLikes(media.totalLikes.valueOf() + 1)
    })

    repository.returnOnFind(media)

    const event = LikeCreatedDomainEvent.fromAggregate(like)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(expectedMedia)
  })

  test('Create a new MediaTotalLikesUpdatedDomainEvent', async () => {
    const media = MediaMother.random()

    const like = LikeMother.random()

    repository.returnOnFind(media)

    const event = LikeCreatedDomainEvent.fromAggregate(like)

    await handler.on(event)

    const expectedMedia = MediaMother.create({
      ...media,
      totalLikes: new TotalLikes(media.totalLikes.valueOf() + 1)
    })

    const expectedEvent = MediaTotalLikesUpdatedDomainEvent.fromAggregate(expectedMedia)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
