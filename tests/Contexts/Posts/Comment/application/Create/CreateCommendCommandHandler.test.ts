import { CreatePostCommandHandler } from '@Posts/Post/application/Create/CreatePostCommandHandler'
import { Creator } from '@Posts/Post/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { PostRepositoryMock } from '../../__mocks__/PostRepositoryMock'
import { PostMother } from '../../domain/PostMother'
import { CreatePostCommandMother } from './CreatePostCommandMother'
import { PostCreatedDomainEvent } from '@Posts/Post/domain/Events/PostCreatedDomainEvent'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { UserMother } from '@Tests/Contexts/Posts/User/domain/UserMother'
import { UserCollectionResponse } from '@Posts/User/application/UserCollectionResponse'
import { SpaceMother } from '@Tests/Contexts/Posts/Space/domain/SpaceMother'
import { FindUsersByCriteriaQuery } from '@Posts/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { FindSpaceByIdQuery } from '@Posts/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Posts/Space/application/SpaceResponse'

let eventBus: EventBusMock
let repository: PostRepositoryMock
let queryBus: QueryBusMock
let handler: CreatePostCommandHandler
let creator: Creator

describe('CreatePostCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new PostRepositoryMock()
    queryBus = new QueryBusMock()
    creator = new Creator(repository, eventBus, queryBus)
    handler = new CreatePostCommandHandler(creator)
  })

  test('Create a new post', async () => {
    const user = UserMother.random()

    const post = PostMother.forAuthor(user)

    const space = SpaceMother.create({ communityId: post.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = CreatePostCommandMother.fromAggregate(post)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(post)
  })

  test('Fail if a post with the same id already exists', async () => {
    const user = UserMother.random()

    const post = PostMother.forAuthor(user)

    const existingPost = PostMother.create({ id: post.id })

    const space = SpaceMother.create({ communityId: post.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = CreatePostCommandMother.fromAggregate(post)

    repository.returnOnFind(existingPost)

    await handler.handle(command)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new PostCreatedDomainEvent', async () => {
    const user = UserMother.random()

    const post = PostMother.forAuthor(user)

    const space = SpaceMother.create({ communityId: post.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = CreatePostCommandMother.fromAggregate(post)

    await handler.handle(command)

    const expectedEvent = PostCreatedDomainEvent.fromAggregate(post)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
