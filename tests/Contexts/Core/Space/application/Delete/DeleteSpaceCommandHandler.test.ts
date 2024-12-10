import { DeleteSpaceCommandHandler } from '@Core/Space/application/Delete/DeleteSpaceCommandHandler'
import { Deleter } from '@Core/Space/application/Delete/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SpaceRepositoryMock } from '../../__mocks__/SpaceRepositoryMock'
import { SpaceMother } from '../../domain/SpaceMother'
import { DeleteSpaceCommandMother } from './DeleteSpaceCommandMother'
import { SpaceDeletedDomainEvent } from '@Core/Space/domain/Events/SpaceDeletedDomainEvent'
import { DeletedAt } from '@Core/Space/domain/ValueObjects/DeletedAt'

let eventBus: EventBusMock
let repository: SpaceRepositoryMock
let handler: DeleteSpaceCommandHandler
let deleter: Deleter

describe('DeleteSpaceCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new SpaceRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteSpaceCommandHandler(deleter)
  })

  test('Delete a new space', async () => {
    const space = SpaceMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = SpaceMother.create({ ...space, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteSpaceCommandMother.fromAggregate(space)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(space)
  })

  test('Delete a new SpaceDeletedDomainEvent', async () => {
    const space = SpaceMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = SpaceMother.create({ ...space, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteSpaceCommandMother.fromAggregate(space)

    await handler.handle(command)

    const expectedEvent = SpaceDeletedDomainEvent.fromAggregate(space)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
