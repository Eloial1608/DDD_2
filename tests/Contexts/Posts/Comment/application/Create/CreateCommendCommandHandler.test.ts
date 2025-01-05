import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { CommentRepositoryMock } from '../../__mocks__/CommentRepositoryMock'
import { CreateCommentCommandHandler } from '@Posts/Comment/application/Create/CreateCommentCommandHandler'
import { Creator } from '@Posts/Comment/application/Create/Creator'
import { UserMother } from '@Tests/Contexts/Posts/User/domain/UserMother'
import { CommentMother } from '../../domain/CommentMother'
import { FindUsersByCriteriaQuery } from '@Posts/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Posts/User/application/UserCollectionResponse'
import { CreateCommentCommandMother } from './CreateCommentCommandMother'
import { CommentCreatedDomainEvent } from '@Posts/Comment/domain/Events/CommentCreatedDomainEvent'
import { PostMother } from '@Tests/Contexts/Posts/Post/domain/PostMother'
import { SpaceMother } from '@Tests/Contexts/Posts/Space/domain/SpaceMother'
import { PostsConfiguration } from '@Shared/domain/SharedValueObjects/Space/Configuration/PostsConfiguration'
import { PostResponse } from '@Posts/Post/application/PostResponse'
import { SpaceResponse } from '@Posts/Space/application/SpaceResponse'
import { FindPostByIdQuery } from '@Posts/Post/application/FindById/FindPostByIdQuery'
import { FindSpaceByIdQuery } from '@Posts/Space/application/FindById/FindSpaceByIdQuery'

let eventBus: EventBusMock
let repository: CommentRepositoryMock
let queryBus: QueryBusMock
let handler: CreateCommentCommandHandler
let creator: Creator

describe('CreatePostCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new CommentRepositoryMock()
    queryBus = new QueryBusMock()
    creator = new Creator(repository, eventBus, queryBus)
    handler = new CreateCommentCommandHandler(creator)
  })

  test('Create a new comment', async () => {
    const user = UserMother.random()

    const comment = CommentMother.forAuthor(user)

    const post = PostMother.random()

    const space = SpaceMother.create({ id: post.spaceId, configuration: new PostsConfiguration({ allowsLikes: true }) })

    queryBus.returnOnQuery(new FindPostByIdQuery(post.id.valueOf()), new PostResponse(post))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))
    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))

    const command = CreateCommentCommandMother.fromAggregate(comment)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(comment)
  })

  test('Fail if a comment with the same id already exists', async () => {
    const user = UserMother.random()

    const comment = CommentMother.forAuthor(user)

    const existingComment = CommentMother.create({ id: comment.id })

    const post = PostMother.random()

    const space = SpaceMother.create({ id: post.spaceId, configuration: new PostsConfiguration({ allowsLikes: true }) })

    queryBus.returnOnQuery(new FindPostByIdQuery(post.id.valueOf()), new PostResponse(post))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))
    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))

    const command = CreateCommentCommandMother.fromAggregate(comment)

    repository.returnOnFind(existingComment)

    await handler.handle(command)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new CommentCreatedDomainEvent', async () => {
    const user = UserMother.random()

    const comment = CommentMother.forAuthor(user)

    const post = PostMother.random()

    const space = SpaceMother.create({ id: post.spaceId, configuration: new PostsConfiguration({ allowsLikes: true }) })

    queryBus.returnOnQuery(new FindPostByIdQuery(post.id.valueOf()), new PostResponse(post))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))
    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))

    const command = CreateCommentCommandMother.fromAggregate(comment)

    await handler.handle(command)

    const expectedEvent = CommentCreatedDomainEvent.fromAggregate(comment)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
