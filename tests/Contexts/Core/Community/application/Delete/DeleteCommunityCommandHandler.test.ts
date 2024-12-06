import { DeleteCommunityCommandHandler } from '@Core/Community/application/Delete/DeleteCommunityCommandHandler'
import { Deleter } from '@Core/Community/application/Delete/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { CommunityRepositoryMock } from '../../__mocks__/CommunityRepositoryMock'
import { CommunityMother } from '../../domain/CommunityMother'
import { DeleteCommunityCommandMother } from './DeleteCommunityCommandMother'
import { CommunityDeletedDomainEvent } from '@Core/Community/domain/Events/CommunityDeletedDomainEvent'
import { DeletedAt } from '@Core/Community/domain/ValueObjects/DeletedAt'

let eventBus: EventBusMock
let repository: CommunityRepositoryMock
let handler: DeleteCommunityCommandHandler
let deleter: Deleter

describe('DeleteCommunityCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new CommunityRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteCommunityCommandHandler(deleter)
  })

  test('Delete a new community', async () => {
    const community = CommunityMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = CommunityMother.create({ ...community, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteCommunityCommandMother.fromAggregate(community)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(community)
  })

  test('Delete a new CommunityDeletedDomainEvent', async () => {
    const community = CommunityMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = CommunityMother.create({ ...community, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteCommunityCommandMother.fromAggregate(community)

    await handler.handle(command)

    const expectedEvent = CommunityDeletedDomainEvent.fromAggregate(community)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
