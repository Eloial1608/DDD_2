import { CreateEventCommandHandler } from '@Events/Event/application/Create/CreateEventCommandHandler'
import { Creator } from '@Events/Event/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { EventRepositoryMock } from '../../__mocks__/EventRepositoryMock'
import { EventMother } from '../../domain/EventMother'
import { CreateEventCommandMother } from './CreateEventCommandMother'
import { EventCreatedDomainEvent } from '@Events/Event/domain/Events/EventCreatedDomainEvent'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { UserMother } from '@Tests/Contexts/Events/User/domain/UserMother'
import { UserCollectionResponse } from '@Events/User/application/UserCollectionResponse'
import { SpaceMother } from '@Tests/Contexts/Events/Space/domain/SpaceMother'
import { FindUsersByCriteriaQuery } from '@Events/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { FindSpaceByIdQuery } from '@Events/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Events/Space/application/SpaceResponse'

let eventBus: EventBusMock
let repository: EventRepositoryMock
let queryBus: QueryBusMock
let handler: CreateEventCommandHandler
let creator: Creator

describe('CreateEventCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new EventRepositoryMock()
    queryBus = new QueryBusMock()
    creator = new Creator(repository, eventBus, queryBus)
    handler = new CreateEventCommandHandler(creator)
  })

  test('Create a new event', async () => {
    const user = UserMother.random()

    const event = EventMother.forAuthor(user)

    const space = SpaceMother.create({ communityId: event.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = CreateEventCommandMother.fromAggregate(event)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(event)
  })

  test('Fail if a event with the same id already exists', async () => {
    const user = UserMother.random()

    const event = EventMother.forAuthor(user)

    const existingEvent = EventMother.create({ id: event.id })

    const space = SpaceMother.create({ communityId: event.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = CreateEventCommandMother.fromAggregate(event)

    repository.returnOnFind(existingEvent)

    await handler.handle(command)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new EventCreatedDomainEvent', async () => {
    const user = UserMother.random()

    const event = EventMother.forAuthor(user)

    const space = SpaceMother.create({ communityId: event.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = CreateEventCommandMother.fromAggregate(event)

    await handler.handle(command)

    const expectedEvent = EventCreatedDomainEvent.fromAggregate(event)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
