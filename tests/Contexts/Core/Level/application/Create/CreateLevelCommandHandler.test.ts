import { CreateLevelCommandHandler } from '@Core/Level/application/Create/CreateLevelCommandHandler'
import { Creator } from '@Core/Level/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { LevelRepositoryMock } from '../../__mocks__/LevelRepositoryMock'
import { LevelMother } from '../../domain/LevelMother'
import { CreateLevelCommandMother } from './CreateLevelCommandMother'
import { LevelAlreadyExistsById } from '@Core/Level/domain/Errors/LevelAlreadyExistsById'
import { LevelCreatedDomainEvent } from '@Core/Level/domain/Events/LevelCreatedDomainEvent'
import { LevelAlreadyExistsByNumber } from '@Core/Level/domain/Errors/LevelAlreadyExistsByNumber'
import { LevelNumber } from '@Core/Level/domain/ValueObjects/LevelNumber'

let eventBus: EventBusMock
let repository: LevelRepositoryMock
let handler: CreateLevelCommandHandler
let creator: Creator

describe('CreateLevelCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new LevelRepositoryMock()
    creator = new Creator(repository, eventBus)
    handler = new CreateLevelCommandHandler(creator)
  })

  test('Create a new level', async () => {
    const level = LevelMother.random()

    const command = CreateLevelCommandMother.fromAggregate(level)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(level)
  })

  test('Fail if a level with the same id already exists', async () => {
    const level = LevelMother.random()
    const existingLevel = LevelMother.create({ id: level.id })

    const command = CreateLevelCommandMother.fromAggregate(level)

    repository.returnOnFind(existingLevel)

    expect(handler.handle(command)).rejects.toThrow(LevelAlreadyExistsById)
  })

  test('Fail if a level with the same levelNumber already exists', async () => {
    const level = LevelMother.create({ levelNumber: new LevelNumber(1) })
    const existingLevel = LevelMother.create({ levelNumber: level.levelNumber, communityId: level.communityId })

    const command = CreateLevelCommandMother.fromAggregate(level)

    repository.returnOnSearch([existingLevel])

    expect(handler.handle(command)).rejects.toThrow(LevelAlreadyExistsByNumber)
  })

  test('Create a new LevelCreatedDomainEvent', async () => {
    const level = LevelMother.random()

    const command = CreateLevelCommandMother.fromAggregate(level)

    await handler.handle(command)

    const expectedEvent = LevelCreatedDomainEvent.fromAggregate(level)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
