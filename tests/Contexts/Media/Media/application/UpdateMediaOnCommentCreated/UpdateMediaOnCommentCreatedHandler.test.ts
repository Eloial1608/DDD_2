import { UpdateMediaOnCommentCreatedHandler } from '@Media/Media/application/UpdateMediaOnCommentCreated/UpdateMediaOnCommentCreatedHandler'
import { Updater } from '@Media/Media/application/UpdateMediaOnCommentCreated/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { MediaRepositoryMock } from '../../__mocks__/MediaRepositoryMock'
import { MediaMother } from '../../domain/MediaMother'
import { CommentMother } from '@Tests/Contexts/Media/Comment/domain/CommentMother'
import { CommentCreatedDomainEvent } from '@Media/Comment/domain/Events/CommentCreatedDomainEvent'
import { MediaTotalCommentsUpdatedDomainEvent } from '@Media/Media/domain/Events/MediaTotalCommentsUpdatedDomainEvent'
import { TotalComments } from '@Media/Media/domain/ValueObjects/TotalComments'

let eventBus: EventBusMock
let repository: MediaRepositoryMock
let handler: UpdateMediaOnCommentCreatedHandler
let updater: Updater

describe('UpdateMediaOnCommentCreatedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new MediaRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateMediaOnCommentCreatedHandler(updater)
  })

  test('Update a media', async () => {
    const media = MediaMother.random()

    const comment = CommentMother.random()

    const expectedMedia = MediaMother.create({
      ...media,
      totalComments: new TotalComments(media.totalComments.valueOf() + 1)
    })

    repository.returnOnFind(media)

    const event = CommentCreatedDomainEvent.fromAggregate(comment)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(expectedMedia)
  })

  test('Create a new MediaTotalCommentsUpdatedDomainEvent', async () => {
    const media = MediaMother.random()

    const comment = CommentMother.random()

    repository.returnOnFind(media)

    const event = CommentCreatedDomainEvent.fromAggregate(comment)

    await handler.on(event)

    const expectedMedia = MediaMother.create({
      ...media,
      totalComments: new TotalComments(media.totalComments.valueOf() + 1)
    })

    const expectedEvent = MediaTotalCommentsUpdatedDomainEvent.fromAggregate(expectedMedia)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
