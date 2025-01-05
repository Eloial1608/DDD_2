import { UpdatePostOnCommentCreatedHandler } from '@Posts/Post/application/UpdatePostOnCommentCreated/UpdatePostOnCommentCreatedHandler'
import { Updater } from '@Posts/Post/application/UpdatePostOnCommentCreated/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { PostRepositoryMock } from '../../__mocks__/PostRepositoryMock'
import { PostMother } from '../../domain/PostMother'
import { CommentMother } from '@Tests/Contexts/Posts/Comment/domain/CommentMother'
import { CommentCreatedDomainEvent } from '@Posts/Comment/domain/Events/CommentCreatedDomainEvent'
import { PostTotalCommentsUpdatedDomainEvent } from '@Posts/Post/domain/Events/PostTotalCommentsUpdatedDomainEvent'
import { TotalComments } from '@Posts/Post/domain/ValueObjects/TotalComments'

let eventBus: EventBusMock
let repository: PostRepositoryMock
let handler: UpdatePostOnCommentCreatedHandler
let updater: Updater

describe('UpdatePostOnCommentCreatedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new PostRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdatePostOnCommentCreatedHandler(updater)
  })

  test('Update a post', async () => {
    const post = PostMother.random()

    const comment = CommentMother.random()

    const expectedPost = PostMother.create({
      ...post,
      totalComments: new TotalComments(post.totalComments.valueOf() + 1)
    })

    repository.returnOnFind(post)

    const event = CommentCreatedDomainEvent.fromAggregate(comment)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(expectedPost)
  })

  test('Create a new PostTotalCommentsUpdatedDomainEvent', async () => {
    const post = PostMother.random()

    const comment = CommentMother.random()

    repository.returnOnFind(post)

    const event = CommentCreatedDomainEvent.fromAggregate(comment)

    await handler.on(event)

    const expectedPost = PostMother.create({
      ...post,
      totalComments: new TotalComments(post.totalComments.valueOf() + 1)
    })

    const expectedEvent = PostTotalCommentsUpdatedDomainEvent.fromAggregate(expectedPost)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
