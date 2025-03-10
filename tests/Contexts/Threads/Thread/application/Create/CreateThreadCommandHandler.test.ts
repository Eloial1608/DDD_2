import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { ThreadRepositoryMock } from '../../__mocks__/ThreadRepositoryMock'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { CreateThreadCommandHandler } from '@Threads/Thread/application/Create/CreateThreadCommandHandler'
import { Creator } from '@Threads/Thread/application/Create/Creator'
import { UserMother } from '@Tests/Contexts/Threads/User/domain/UserMother'
import { ThreadMother } from '../../domain/ThreadMother'
import { SpaceMother } from '@Tests/Contexts/Threads/Space/domain/SpaceMother'
import { FindUsersByCriteriaQuery } from '@Threads/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Threads/User/application/UserCollectionResponse'
import { FindSpaceByIdQuery } from '@Threads/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Threads/Space/application/SpaceResponse'
import { CreateThreadCommandMother } from './CreateThreadCommandMother'
import { ThreadCreatedDomainEvent } from '@Threads/Thread/domain/Events/ThreadCreatedDomainEvent'

let eventBus: EventBusMock
let repository: ThreadRepositoryMock
let queryBus: QueryBusMock
let handler: CreateThreadCommandHandler
let creator: Creator

describe('CreateThreadCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new ThreadRepositoryMock()
    queryBus = new QueryBusMock()
    creator = new Creator(repository, eventBus, queryBus)
    handler = new CreateThreadCommandHandler(creator)
  })

  test('Create a new thread', async () => {
    const user = UserMother.random()

    const thread = ThreadMother.forAuthor(user)

    const space = SpaceMother.create({ communityId: thread.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = CreateThreadCommandMother.fromAggregate(thread)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(thread)
  })

  test('Fail if a thread with the same id already exists', async () => {
    const user = UserMother.random()

    const thread = ThreadMother.forAuthor(user)

    const existingThread = ThreadMother.create({ id: thread.id })

    const space = SpaceMother.create({ communityId: thread.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = CreateThreadCommandMother.fromAggregate(thread)

    repository.returnOnFind(existingThread)

    await handler.handle(command)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new ThreadCreatedDomainEvent', async () => {
    const user = UserMother.random()

    const thread = ThreadMother.forAuthor(user)

    const space = SpaceMother.create({ communityId: thread.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = CreateThreadCommandMother.fromAggregate(thread)

    await handler.handle(command)

    const expectedEvent = ThreadCreatedDomainEvent.fromAggregate(thread)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
