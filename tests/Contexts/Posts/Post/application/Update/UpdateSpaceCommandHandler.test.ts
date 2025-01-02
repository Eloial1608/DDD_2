import { UpdatePostCommandHandler } from '@Posts/Post/application/Update/UpdatePostCommandHandler'
import { Updater } from '@Posts/Post/application/Update/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { PostRepositoryMock } from '../../__mocks__/PostRepositoryMock'
import { PostMother } from '../../domain/PostMother'
import { UpdatePostCommandMother } from './UpdatePostCommandMother'
import { PostUpdatedDomainEvent } from '@Posts/Post/domain/Events/PostUpdatedDomainEvent'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { UserMother } from '@Tests/Contexts/Posts/User/domain/UserMother'
import { UserCollectionResponse } from '@Posts/User/application/UserCollectionResponse'
import { PostNotFound } from '@Posts/Post/domain/Errors/PostNotFound'

let eventBus: EventBusMock
let repository: PostRepositoryMock
let queryBus: QueryBusMock
let handler: UpdatePostCommandHandler
let updater: Updater

describe('UpdatePostCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new PostRepositoryMock()
    queryBus = new QueryBusMock()
    updater = new Updater(repository, eventBus, queryBus)
    handler = new UpdatePostCommandHandler(updater)
  })

  test('Update a post', async () => {
    const user = UserMother.random()

    const post = PostMother.forAuthor(user)

    const existingPost = PostMother.create({
      id: post.id,
      author: post.author,
      userId: post.userId,
      communityId: post.communityId
    })

    repository.returnOnFind(existingPost)

    queryBus.returnOnAsk(new UserCollectionResponse([user]))

    const command = UpdatePostCommandMother.fromAggregate(post)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(post)
  })

  test('Fail if the user doesnt exists', async () => {
    const user = UserMother.random()

    const post = PostMother.forAuthor(user)

    queryBus.returnOnAsk(new UserCollectionResponse([user]))

    const command = UpdatePostCommandMother.fromAggregate(post)

    expect(handler.handle(command)).rejects.toThrow(PostNotFound)
  })

  test('Create a new PostUpdatedDomainEvent', async () => {
    const user = UserMother.random()

    const post = PostMother.forAuthor(user)

    const existingPost = PostMother.create({
      id: post.id,
      author: post.author,
      userId: post.userId,
      communityId: post.communityId
    })

    repository.returnOnFind(existingPost)

    queryBus.returnOnAsk(new UserCollectionResponse([user]))

    const command = UpdatePostCommandMother.fromAggregate(post)

    await handler.handle(command)

    const expectedEvent = PostUpdatedDomainEvent.fromAggregate(post)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
