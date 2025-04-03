import { UpdateEventCommandHandler } from '@Events/Event/application/Update/UpdateEventCommandHandler'
import { Updater } from '@Events/Event/application/Update/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { EventRepositoryMock } from '../../__mocks__/EventRepositoryMock'
import { EventMother } from '../../domain/EventMother'
import { UpdateEventCommandMother } from './UpdateEventCommandMother'
import { EventUpdatedDomainEvent } from '@Events/Event/domain/Events/EventUpdatedDomainEvent'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { UserMother } from '@Tests/Contexts/Events/User/domain/UserMother'
import { UserCollectionResponse } from '@Events/User/application/UserCollectionResponse'
import { EventNotFound } from '@Events/Event/domain/Errors/EventNotFound'
import { FindUsersByCriteriaQuery } from '@Events/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { FindSpaceByIdQuery } from '@Events/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Events/Space/application/SpaceResponse'
import { SpaceMother } from '@Tests/Contexts/Events/Space/domain/SpaceMother'

let eventBus: EventBusMock
let repository: EventRepositoryMock
let queryBus: QueryBusMock
let handler: UpdateEventCommandHandler
let updater: Updater

describe('UpdateEventCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new EventRepositoryMock()
    queryBus = new QueryBusMock()
    updater = new Updater(repository, eventBus, queryBus)
    handler = new UpdateEventCommandHandler(updater)
  })

  test('Update a event', async () => {
    const user = UserMother.random()

    const event = EventMother.forAuthor(user)

    const existingEvent = EventMother.create({
      id: event.id,
      author: event.author,
      userId: event.userId,
      spaceId: event.spaceId,
      communityId: event.communityId
    })

    repository.returnOnFind(existingEvent)

    const space = SpaceMother.create({ communityId: event.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = UpdateEventCommandMother.fromAggregate(event)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(event)
  })

  test('Fail if the user doesnt exists', async () => {
    const user = UserMother.random()

    const event = EventMother.forAuthor(user)

    const space = SpaceMother.create({ communityId: event.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = UpdateEventCommandMother.fromAggregate(event)

    expect(handler.handle(command)).rejects.toThrow(EventNotFound)
  })

  test('Create a new EventUpdatedDomainEvent', async () => {
    const user = UserMother.random()

    const event = EventMother.forAuthor(user)

    const existingEvent = EventMother.create({
      id: event.id,
      author: event.author,
      userId: event.userId,
      spaceId: event.spaceId,
      communityId: event.communityId
    })

    repository.returnOnFind(existingEvent)

    const space = SpaceMother.create({ communityId: event.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = UpdateEventCommandMother.fromAggregate(event)

    await handler.handle(command)

    const expectedEvent = EventUpdatedDomainEvent.fromAggregate(event)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
