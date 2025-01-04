import { UpdatePostOnCommentDeletedHandler } from '@Posts/Post/application/UpdatePostOnCommentDeleted/UpdatePostOnCommentDeletedHandler'
import { Updater } from '@Posts/Post/application/UpdatePostOnCommentDeleted/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { PostRepositoryMock } from '../../__mocks__/PostRepositoryMock'
import { PostMother } from '../../domain/PostMother'
import { CommentMother } from '@Tests/Contexts/Posts/Comment/domain/CommentMother'
import { CommentDeletedDomainEvent } from '@Posts/Comment/domain/Events/CommentDeletedDomainEvent'
import { PostTotalCommentsUpdatedDomainEvent } from '@Posts/Post/domain/Events/PostTotalCommentsUpdatedDomainEvent'

let eventBus: EventBusMock
let repository: PostRepositoryMock
let handler: UpdatePostOnCommentDeletedHandler
let updater: Updater

describe('UpdatePostOnCommentDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new PostRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdatePostOnCommentDeletedHandler(updater)
  })

  test('Update a post', async () => {
    const post = PostMother.random()

    const comment = CommentMother.random()

    repository.returnOnFind(post)

    const event = CommentDeletedDomainEvent.fromAggregate(comment)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(post)
  })

  test('Create a new PostTotalCommentsUpdatedDomainEvent', async () => {
    const post = PostMother.random()

    const comment = CommentMother.random()

    repository.returnOnFind(post)

    const event = CommentDeletedDomainEvent.fromAggregate(comment)

    await handler.on(event)

    const expectedEvent = PostTotalCommentsUpdatedDomainEvent.fromAggregate(post)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
