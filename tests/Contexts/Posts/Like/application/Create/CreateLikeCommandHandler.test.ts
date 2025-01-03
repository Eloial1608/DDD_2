import { Creator } from '@Posts/Like/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { LikeRepositoryMock } from '../../__mocks__/LikeRepositoryMock'
import { LikeMother } from '../../domain/LikeMother'
import { CreateLikeCommandMother } from './CreateLikeCommandMother'
import { LikeCreatedDomainEvent } from '@Posts/Like/domain/Events/LikeCreatedDomainEvent'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { SpaceMother } from '@Tests/Contexts/Posts/Space/domain/SpaceMother'
import { FindSpaceByIdQuery } from '@Posts/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Posts/Space/application/SpaceResponse'
import { PostMother } from '@Tests/Contexts/Posts/Post/domain/PostMother'
import { FindPostByIdQuery } from '@Posts/Post/application/FindById/FindPostByIdQuery'
import { PostResponse } from '@Posts/Post/application/PostResponse'
import { CreateLikeCommandHandler } from '@Posts/Like/application/Create/CreateLikeCommandHandler'
import { PostsConfiguration } from '@Shared/domain/SharedValueObjects/Space/Configuration/PostsConfiguration'

let eventBus: EventBusMock
let repository: LikeRepositoryMock
let queryBus: QueryBusMock
let handler: CreateLikeCommandHandler
let creator: Creator

describe('CreateLikeCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new LikeRepositoryMock()
    queryBus = new QueryBusMock()
    creator = new Creator(repository, queryBus, eventBus)
    handler = new CreateLikeCommandHandler(creator)
  })

  test('Create a new like', async () => {
    const post = PostMother.random()
    const space = SpaceMother.create({ id: post.spaceId, configuration: new PostsConfiguration({ allowsLikes: true }) })

    const like = LikeMother.create({ postId: post.id })

    queryBus.returnOnQuery(new FindPostByIdQuery(post.id.valueOf()), new PostResponse(post))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = CreateLikeCommandMother.fromAggregate(like)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(like)
  })

  test('Create a new LikeCreatedDomainEvent', async () => {
    const post = PostMother.random()
    const space = SpaceMother.create({ id: post.spaceId, configuration: new PostsConfiguration({ allowsLikes: true }) })

    const like = LikeMother.create({ postId: post.id })

    queryBus.returnOnQuery(new FindPostByIdQuery(post.id.valueOf()), new PostResponse(post))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = CreateLikeCommandMother.fromAggregate(like)

    await handler.handle(command)

    const expectedEvent = LikeCreatedDomainEvent.fromAggregate(like)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
