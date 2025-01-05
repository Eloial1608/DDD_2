import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { CommentRepositoryMock } from '../../__mocks__/CommentRepositoryMock'
import { CreateCommentCommandHandler } from '@Media/Comment/application/Create/CreateCommentCommandHandler'
import { Creator } from '@Media/Comment/application/Create/Creator'
import { UserMother } from '@Tests/Contexts/Media/User/domain/UserMother'
import { CommentMother } from '../../domain/CommentMother'
import { FindUsersByCriteriaQuery } from '@Media/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Media/User/application/UserCollectionResponse'
import { CreateCommentCommandMother } from './CreateCommentCommandMother'
import { CommentCreatedDomainEvent } from '@Media/Comment/domain/Events/CommentCreatedDomainEvent'
import { MediaMother } from '@Tests/Contexts/Media/Media/domain/MediaMother'
import { SpaceMother } from '@Tests/Contexts/Media/Space/domain/SpaceMother'
import { MediaConfiguration } from '@Shared/domain/SharedValueObjects/Space/Configuration/MediaConfiguration'
import { MediaResponse } from '@Media/Media/application/MediaResponse'
import { SpaceResponse } from '@Media/Space/application/SpaceResponse'
import { FindMediaByIdQuery } from '@Media/Media/application/FindById/FindMediaByIdQuery'
import { FindSpaceByIdQuery } from '@Media/Space/application/FindById/FindSpaceByIdQuery'

let eventBus: EventBusMock
let repository: CommentRepositoryMock
let queryBus: QueryBusMock
let handler: CreateCommentCommandHandler
let creator: Creator

describe('CreateMediaCommandHandler should ', () => {
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

    const media = MediaMother.random()

    const space = SpaceMother.create({ id: media.spaceId, configuration: new MediaConfiguration({ allowsLikes: true }) })

    queryBus.returnOnQuery(new FindMediaByIdQuery(media.id.valueOf()), new MediaResponse(media))
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

    const media = MediaMother.random()

    const space = SpaceMother.create({ id: media.spaceId, configuration: new MediaConfiguration({ allowsLikes: true }) })

    queryBus.returnOnQuery(new FindMediaByIdQuery(media.id.valueOf()), new MediaResponse(media))
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

    const media = MediaMother.random()

    const space = SpaceMother.create({ id: media.spaceId, configuration: new MediaConfiguration({ allowsLikes: true }) })

    queryBus.returnOnQuery(new FindMediaByIdQuery(media.id.valueOf()), new MediaResponse(media))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))
    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))

    const command = CreateCommentCommandMother.fromAggregate(comment)

    await handler.handle(command)

    const expectedEvent = CommentCreatedDomainEvent.fromAggregate(comment)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
