import { UpdateMediaOnCommentDeletedHandler } from '@Media/Media/application/UpdateMediaOnCommentDeleted/UpdateMediaOnCommentDeletedHandler'
import { Updater } from '@Media/Media/application/UpdateMediaOnCommentDeleted/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { MediaRepositoryMock } from '../../__mocks__/MediaRepositoryMock'
import { MediaMother } from '../../domain/MediaMother'
import { CommentMother } from '@Tests/Contexts/Media/Comment/domain/CommentMother'
import { CommentDeletedDomainEvent } from '@Media/Comment/domain/Events/CommentDeletedDomainEvent'
import { MediaTotalCommentsUpdatedDomainEvent } from '@Media/Media/domain/Events/MediaTotalCommentsUpdatedDomainEvent'

let eventBus: EventBusMock
let repository: MediaRepositoryMock
let handler: UpdateMediaOnCommentDeletedHandler
let updater: Updater

describe('UpdateMediaOnCommentDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new MediaRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateMediaOnCommentDeletedHandler(updater)
  })

  test('Update a media', async () => {
    const media = MediaMother.random()

    const comment = CommentMother.random()

    repository.returnOnFind(media)

    const event = CommentDeletedDomainEvent.fromAggregate(comment)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(media)
  })

  test('Create a new MediaTotalCommentsUpdatedDomainEvent', async () => {
    const media = MediaMother.random()

    const comment = CommentMother.random()

    repository.returnOnFind(media)

    const event = CommentDeletedDomainEvent.fromAggregate(comment)

    await handler.on(event)

    const expectedEvent = MediaTotalCommentsUpdatedDomainEvent.fromAggregate(media)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
