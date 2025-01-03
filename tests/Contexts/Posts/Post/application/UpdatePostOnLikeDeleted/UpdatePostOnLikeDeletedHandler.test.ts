import { UpdatePostOnLikeDeletedHandler } from '@Posts/Post/application/UpdatePostOnLikeDeleted/UpdatePostOnLikeDeletedHandler'
import { Updater } from '@Posts/Post/application/UpdatePostOnLikeDeleted/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { PostRepositoryMock } from '../../__mocks__/PostRepositoryMock'
import { PostMother } from '../../domain/PostMother'
import { LikeMother } from '@Tests/Contexts/Posts/Like/domain/LikeMother'
import { LikeDeletedDomainEvent } from '@Posts/Like/domain/Events/LikeDeletedDomainEvent'
import { PostTotalLikesUpdatedDomainEvent } from '@Posts/Post/domain/Events/PostTotalLikesUpdatedDomainEvent'

let eventBus: EventBusMock
let repository: PostRepositoryMock
let handler: UpdatePostOnLikeDeletedHandler
let updater: Updater

describe('UpdatePostOnLikeDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new PostRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdatePostOnLikeDeletedHandler(updater)
  })

  test('Update a post', async () => {
    const post = PostMother.random()

    const like = LikeMother.random()

    repository.returnOnFind(post)

    const event = LikeDeletedDomainEvent.fromAggregate(like)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(post)
  })

  test('Create a new PostTotalLikesUpdatedDomainEvent', async () => {
    const post = PostMother.random()

    const like = LikeMother.random()

    repository.returnOnFind(post)

    const event = LikeDeletedDomainEvent.fromAggregate(like)

    await handler.on(event)

    const expectedEvent = PostTotalLikesUpdatedDomainEvent.fromAggregate(post)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
