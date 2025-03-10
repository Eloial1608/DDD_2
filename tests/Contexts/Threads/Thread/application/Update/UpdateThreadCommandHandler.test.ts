import { UpdateThreadCommandHandler } from '@Threads/Thread/application/Update/UpdateThreadCommandHandler'
import { Updater } from '@Threads/Thread/application/Update/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { ThreadRepositoryMock } from '../../__mocks__/ThreadRepositoryMock'
import { ThreadMother } from '../../domain/ThreadMother'
import { UpdateThreadCommandMother } from './UpdateThreadCommandMother'
import { ThreadUpdatedDomainEvent } from '@Threads/Thread/domain/Events/ThreadUpdatedDomainEvent'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { UserMother } from '@Tests/Contexts/Threads/User/domain/UserMother'
import { UserCollectionResponse } from '@Threads/User/application/UserCollectionResponse'
import { ThreadNotFound } from '@Threads/Thread/domain/Errors/ThreadNotFound'
import { FindUsersByCriteriaQuery } from '@Threads/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { FindSpaceByIdQuery } from '@Threads/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Threads/Space/application/SpaceResponse'
import { SpaceMother } from '@Tests/Contexts/Threads/Space/domain/SpaceMother'

let eventBus: EventBusMock
let repository: ThreadRepositoryMock
let queryBus: QueryBusMock
let handler: UpdateThreadCommandHandler
let updater: Updater

describe('UpdateThreadCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new ThreadRepositoryMock()
    queryBus = new QueryBusMock()
    updater = new Updater(repository, eventBus, queryBus)
    handler = new UpdateThreadCommandHandler(updater)
  })

  test('Update a thread', async () => {
    const user = UserMother.random()

    const thread = ThreadMother.forAuthor(user)

    const existingThread = ThreadMother.create({
      id: thread.id,
      author: thread.author,
      userId: thread.userId,
      spaceId: thread.spaceId,
      communityId: thread.communityId
    })

    repository.returnOnFind(existingThread)

    const space = SpaceMother.create({ communityId: thread.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = UpdateThreadCommandMother.fromAggregate(thread)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(thread)
  })

  test('Fail if the user doesnt exists', async () => {
    const user = UserMother.random()

    const thread = ThreadMother.forAuthor(user)

    const space = SpaceMother.create({ communityId: thread.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = UpdateThreadCommandMother.fromAggregate(thread)

    expect(handler.handle(command)).rejects.toThrow(ThreadNotFound)
  })

  test('Create a new ThreadUpdatedDomainEvent', async () => {
    const user = UserMother.random()

    const thread = ThreadMother.forAuthor(user)

    const existingThread = ThreadMother.create({
      id: thread.id,
      author: thread.author,
      userId: thread.userId,
      spaceId: thread.spaceId,
      communityId: thread.communityId
    })

    repository.returnOnFind(existingThread)

    const space = SpaceMother.create({ communityId: thread.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = UpdateThreadCommandMother.fromAggregate(thread)

    await handler.handle(command)

    const expectedEvent = ThreadUpdatedDomainEvent.fromAggregate(thread)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
