import { UpdatePostOnLikeCreatedHandler } from '@Posts/Post/application/UpdatePostOnLikeCreated/UpdatePostOnLikeCreatedHandler'
import { Updater } from '@Posts/Post/application/UpdatePostOnLikeCreated/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { PostRepositoryMock } from '../../__mocks__/PostRepositoryMock'
import { PostMother } from '../../domain/PostMother'
import { LikeMother } from '@Tests/Contexts/Posts/Like/domain/LikeMother'
import { LikeCreatedDomainEvent } from '@Posts/Like/domain/Events/LikeCreatedDomainEvent'
import { PostTotalLikesUpdatedDomainEvent } from '@Posts/Post/domain/Events/PostTotalLikesUpdatedDomainEvent'
import { TotalLikes } from '@Posts/Post/domain/ValueObjects/TotalLikes'

let eventBus: EventBusMock
let repository: PostRepositoryMock
let handler: UpdatePostOnLikeCreatedHandler
let updater: Updater

describe('UpdatePostOnLikeCreatedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new PostRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdatePostOnLikeCreatedHandler(updater)
  })

  test('Update a post', async () => {
    const post = PostMother.random()

    const like = LikeMother.random()

    const expectedPost = PostMother.create({
      ...post,
      totalLikes: new TotalLikes(post.totalLikes.valueOf() + 1)
    })

    repository.returnOnFind(post)

    const event = LikeCreatedDomainEvent.fromAggregate(like)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(expectedPost)
  })

  test('Create a new PostTotalLikesUpdatedDomainEvent', async () => {
    const post = PostMother.random()

    const like = LikeMother.random()

    repository.returnOnFind(post)

    const event = LikeCreatedDomainEvent.fromAggregate(like)

    await handler.on(event)

    const expectedPost = PostMother.create({
      ...post,
      totalLikes: new TotalLikes(post.totalLikes.valueOf() + 1)
    })

    const expectedEvent = PostTotalLikesUpdatedDomainEvent.fromAggregate(expectedPost)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
