import { UpdatePostOnUserUpdatedHandler } from '@Posts/Post/application/UpdatePostOnUserUpdated/UpdatePostOnUserUpdatedHandler'
import { Updater } from '@Posts/Post/application/UpdatePostOnUserUpdated/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { PostRepositoryMock } from '../../__mocks__/PostRepositoryMock'
import { PostMother } from '../../domain/PostMother'
import { UserMother } from '@Tests/Contexts/Posts/User/domain/UserMother'
import { UserCreatedDomainEvent } from '@Posts/User/domain/Events/UserCreatedDomainEvent'
import { Author } from '@Posts/Post/domain/ValueObjects/Author'
import { PostAuthorUpdatedDomainEvent } from '@Posts/Post/domain/Events/PostAuthorUpdatedDomainEvent'

let eventBus: EventBusMock
let repository: PostRepositoryMock
let handler: UpdatePostOnUserUpdatedHandler
let updater: Updater

describe('UpdatePostOnUserUpdatedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new PostRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdatePostOnUserUpdatedHandler(updater)
  })

  test('Update a post', async () => {
    const post = PostMother.random()

    const user = UserMother.random()

    const expectedPost = PostMother.create({
      ...post,
      author: new Author(
        user.id.valueOf(),
        user.mainId.valueOf(),
        user.name.valueOf(),
        user.username.valueOf(),
        user.pictureUrl?.valueOf(),
        user.bannerUrl?.valueOf()
      )
    })

    repository.returnOnSearch([post])

    const event = UserCreatedDomainEvent.fromAggregate(user)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(expectedPost)
  })

  test('Create a new PostTotalUsersUpdatedDomainEvent', async () => {
    const post = PostMother.random()

    const user = UserMother.random()

    repository.returnOnSearch([post])

    const event = UserCreatedDomainEvent.fromAggregate(user)

    await handler.on(event)

    const expectedPost = PostMother.create({
      ...post,
      author: new Author(
        user.id.valueOf(),
        user.mainId.valueOf(),
        user.name.valueOf(),
        user.username.valueOf(),
        user.pictureUrl?.valueOf(),
        user.bannerUrl?.valueOf()
      )
    })

    const expectedEvent = PostAuthorUpdatedDomainEvent.fromAggregate(expectedPost)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
