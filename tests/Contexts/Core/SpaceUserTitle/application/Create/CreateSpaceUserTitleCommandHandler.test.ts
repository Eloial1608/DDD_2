import { CreateSpaceUserTitleCommandHandler } from '@Core/SpaceUserTitle/application/Create/CreateSpaceUserTitleCommandHandler'
import { Creator } from '@Core/SpaceUserTitle/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SpaceUserTitleRepositoryMock } from '../../__mocks__/SpaceUserTitleRepositoryMock'
import { SpaceUserTitleMother } from '../../domain/SpaceUserTitleMother'
import { CreateSpaceUserTitleCommandMother } from './CreateSpaceUserTitleCommandMother'
import { SpaceUserTitleAlreadyExistsById } from '@Core/SpaceUserTitle/domain/Errors/SpaceUserTitleAlreadyExistsById'
import { SpaceUserTitleCreatedDomainEvent } from '@Core/SpaceUserTitle/domain/Events/SpaceUserTitleCreatedDomainEvent'

let eventBus: EventBusMock
let repository: SpaceUserTitleRepositoryMock
let handler: CreateSpaceUserTitleCommandHandler
let creator: Creator

describe('CreateSpaceUserTitleCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new SpaceUserTitleRepositoryMock()
    creator = new Creator(repository, eventBus)
    handler = new CreateSpaceUserTitleCommandHandler(creator)
  })

  test('Create a new spaceUserTitle', async () => {
    const spaceUserTitle = SpaceUserTitleMother.random()
    const command = CreateSpaceUserTitleCommandMother.fromAggregate(spaceUserTitle)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(spaceUserTitle)
  })

  test('Fail if a spaceUserTitle with the same id already exists', async () => {
    const spaceUserTitle = SpaceUserTitleMother.random()
    const existing = SpaceUserTitleMother.create({ id: spaceUserTitle.id })

    const command = CreateSpaceUserTitleCommandMother.fromAggregate(spaceUserTitle)

    repository.returnOnFind(existing)

    expect(handler.handle(command)).rejects.toThrow(SpaceUserTitleAlreadyExistsById)
  })

  test('Create a new SpaceUserTitleCreatedDomainEvent', async () => {
    const spaceUserTitle = SpaceUserTitleMother.random()
    const command = CreateSpaceUserTitleCommandMother.fromAggregate(spaceUserTitle)

    await handler.handle(command)

    const expectedEvent = SpaceUserTitleCreatedDomainEvent.fromAggregate(spaceUserTitle)
    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
