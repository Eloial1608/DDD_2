import { UpdateLevelCommandHandler } from '@Core/Level/application/Update/UpdateLevelCommandHandler'
import { Updater } from '@Core/Level/application/Update/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { LevelRepositoryMock } from '../../__mocks__/LevelRepositoryMock'
import { LevelMother } from '../../domain/LevelMother'
import { UpdateLevelCommandMother } from './UpdateLevelCommandMother'
import { LevelUpdatedDomainEvent } from '@Core/Level/domain/Events/LevelUpdatedDomainEvent'
import { LevelNotFound } from '@Core/Level/domain/Errors/LevelNotFound'

let eventBus: EventBusMock
let repository: LevelRepositoryMock
let handler: UpdateLevelCommandHandler
let updater: Updater

describe('UpdateLevelCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new LevelRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateLevelCommandHandler(updater)
  })

  test('Update a level', async () => {
    const level = LevelMother.random()
    const existingLevel = LevelMother.create({
      id: level.id,
      communityId: level.communityId,
      levelNumber: level.levelNumber,
      minimumExp: level.minimumExp
    })

    repository.returnOnFind(existingLevel)

    const command = UpdateLevelCommandMother.fromAggregate(level)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(level)
  })

  test('Fail if a level doesnt exists', async () => {
    const level = LevelMother.random()
    const command = UpdateLevelCommandMother.fromAggregate(level)

    expect(handler.handle(command)).rejects.toThrow(LevelNotFound)
  })

  test('Update a new LevelUpdatedDomainEvent', async () => {
    const level = LevelMother.random()
    const existingLevel = LevelMother.create({
      id: level.id,
      communityId: level.communityId,
      levelNumber: level.levelNumber,
      minimumExp: level.minimumExp
    })

    repository.returnOnFind(existingLevel)

    const command = UpdateLevelCommandMother.fromAggregate(level)

    await handler.handle(command)

    const expectedEvent = LevelUpdatedDomainEvent.fromAggregate(level)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
