import { CreateSpaceCommandHandler } from '@Core/Space/application/Create/CreateSpaceCommandHandler'
import { Creator } from '@Core/Space/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SpaceRepositoryMock } from '../../__mocks__/SpaceRepositoryMock'
import { SpaceMother } from '../../domain/SpaceMother'
import { CreateSpaceCommandMother } from './CreateSpaceCommandMother'
import { SpaceAlreadyExistsById } from '@Core/Space/domain/Errors/SpaceAlreadyExistsById'
import { SpaceAlreadyExistsBySlug } from '@Core/Space/domain/Errors/SpaceAlreadyExistsBySlug'
import { SpaceCreatedDomainEvent } from '@Core/Space/domain/Events/SpaceCreatedDomainEvent'

let eventBus: EventBusMock
let repository: SpaceRepositoryMock
let handler: CreateSpaceCommandHandler
let creator: Creator

describe('CreateSpaceCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new SpaceRepositoryMock()
    creator = new Creator(repository, eventBus)
    handler = new CreateSpaceCommandHandler(creator)
  })

  test('Create a new space', async () => {
    const space = SpaceMother.random()

    const command = CreateSpaceCommandMother.fromAggregate(space)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(space)
  })

  test('Fail if a space with the same id already exists', async () => {
    const space = SpaceMother.random()
    const existingSpace = SpaceMother.create({ id: space.id })

    const command = CreateSpaceCommandMother.fromAggregate(space)

    repository.returnOnFind(existingSpace)

    expect(handler.handle(command)).rejects.toThrow(SpaceAlreadyExistsById)
  })

  test('Fail if a space with the same slug already exists', async () => {
    const space = SpaceMother.random()
    const existingSpace = SpaceMother.create({ slug: space.slug })

    const command = CreateSpaceCommandMother.fromAggregate(space)

    repository.returnOnSearch([existingSpace])

    expect(handler.handle(command)).rejects.toThrow(SpaceAlreadyExistsBySlug)
  })

  test('Create a new SpaceCreatedDomainEvent', async () => {
    const space = SpaceMother.random()

    const command = CreateSpaceCommandMother.fromAggregate(space)

    await handler.handle(command)

    const expectedEvent = SpaceCreatedDomainEvent.fromAggregate(space)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
