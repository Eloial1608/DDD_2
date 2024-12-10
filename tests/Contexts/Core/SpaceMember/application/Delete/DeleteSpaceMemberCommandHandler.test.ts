import { DeleteSpaceMemberCommandHandler } from '@Core/SpaceMember/application/Delete/DeleteSpaceMemberCommandHandler'
import { Deleter } from '@Core/SpaceMember/application/Delete/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SpaceMemberRepositoryMock } from '../../__mocks__/SpaceMemberRepositoryMock'
import { SpaceMemberMother } from '../../domain/SpaceMemberMother'
import { DeleteSpaceMemberCommandMother } from './DeleteSpaceMemberCommandMother'
import { SpaceMemberDeletedDomainEvent } from '@Core/SpaceMember/domain/Events/SpaceMemberDeletedDomainEvent'
import { DeletedAt } from '@Core/SpaceMember/domain/ValueObjects/DeletedAt'

let eventBus: EventBusMock
let repository: SpaceMemberRepositoryMock
let handler: DeleteSpaceMemberCommandHandler
let deleter: Deleter

describe('DeleteSpaceMemberCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new SpaceMemberRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteSpaceMemberCommandHandler(deleter)
  })

  test('Delete a new spacemember', async () => {
    const spacemember = SpaceMemberMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = SpaceMemberMother.create({ ...spacemember, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteSpaceMemberCommandMother.fromAggregate(spacemember)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(spacemember)
  })

  test('Delete a new SpaceMemberDeletedDomainEvent', async () => {
    const spacemember = SpaceMemberMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = SpaceMemberMother.create({ ...spacemember, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteSpaceMemberCommandMother.fromAggregate(spacemember)

    await handler.handle(command)

    const expectedEvent = SpaceMemberDeletedDomainEvent.fromAggregate(spacemember)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
