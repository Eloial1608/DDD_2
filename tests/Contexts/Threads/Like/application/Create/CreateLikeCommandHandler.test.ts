import { Creator } from '@Threads/Like/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { LikeRepositoryMock } from '../../__mocks__/LikeRepositoryMock'
import { LikeMother } from '../../domain/LikeMother'
import { CreateLikeCommandMother } from './CreateLikeCommandMother'
import { LikeCreatedDomainEvent } from '@Threads/Like/domain/Events/LikeCreatedDomainEvent'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { SpaceMother } from '@Tests/Contexts/Threads/Space/domain/SpaceMother'
import { FindSpaceByIdQuery } from '@Threads/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Threads/Space/application/SpaceResponse'
import { ThreadMother } from '@Tests/Contexts/Threads/Thread/domain/ThreadMother'
import { FindThreadByIdQuery } from '@Threads/Thread/application/FindById/FindThreadByIdQuery'
import { ThreadResponse } from '@Threads/Thread/application/ThreadResponse'
import { CreateLikeCommandHandler } from '@Threads/Like/application/Create/CreateLikeCommandHandler'
import { ThreadsConfiguration } from '@Shared/domain/SharedValueObjects/Space/Configuration/ThreadsConfiguration'

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
    const thread = ThreadMother.random()
    const space = SpaceMother.create({ id: thread.spaceId, configuration: new ThreadsConfiguration({ allowsLikes: true }) })

    const like = LikeMother.create({ threadId: thread.id })

    queryBus.returnOnQuery(new FindThreadByIdQuery(thread.id.valueOf()), new ThreadResponse(thread))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = CreateLikeCommandMother.fromAggregate(like)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(like)
  })

  test('Create a new LikeCreatedDomainEvent', async () => {
    const thread = ThreadMother.random()
    const space = SpaceMother.create({ id: thread.spaceId, configuration: new ThreadsConfiguration({ allowsLikes: true }) })

    const like = LikeMother.create({ threadId: thread.id })

    queryBus.returnOnQuery(new FindThreadByIdQuery(thread.id.valueOf()), new ThreadResponse(thread))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = CreateLikeCommandMother.fromAggregate(like)

    await handler.handle(command)

    const expectedEvent = LikeCreatedDomainEvent.fromAggregate(like)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
