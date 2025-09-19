import { DeleteLevelCommandHandler } from '@Core/Level/application/Delete/DeleteLevelCommandHandler'
import { Deleter } from '@Core/Level/application/Delete/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { LevelRepositoryMock } from '../../__mocks__/LevelRepositoryMock'
import { LevelMother } from '../../domain/LevelMother'
import { DeleteLevelCommandMother } from './DeleteLevelCommandMother'
import { LevelDeletedDomainEvent } from '@Core/Level/domain/Events/LevelDeletedDomainEvent'

let eventBus: EventBusMock
let repository: LevelRepositoryMock
let handler: DeleteLevelCommandHandler
let deleter: Deleter

describe('DeleteLevelCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new LevelRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteLevelCommandHandler(deleter)
  })

  test('Delete a new level', async () => {
    const level = LevelMother.create({})

    const existing = LevelMother.create({ ...level })

    repository.returnOnFind(existing)

    const command = DeleteLevelCommandMother.fromAggregate(level)

    await handler.handle(command)

    repository.assertDeleteHasBeenCalledWith(level)
  })

  test('Delete a new LevelDeletedDomainEvent', async () => {
    const level = LevelMother.create({ })

    const existing = LevelMother.create({ ...level })

    repository.returnOnFind(existing)

    const command = DeleteLevelCommandMother.fromAggregate(level)

    await handler.handle(command)

    const expectedEvent = LevelDeletedDomainEvent.fromAggregate(level)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
