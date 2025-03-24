import { DeleteCommunityOnCommunityDeletedHandler } from '@Threads/Community/application/DeleteCommunityOnCommunityDeleted/DeleteCommunityOnCommunityDeletedHandler'
import { Deleter } from '@Threads/Community/application/DeleteCommunityOnCommunityDeleted/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { CommunityRepositoryMock } from '../../__mocks__/CommunityRepositoryMock'
import { CommunityMother } from '../../domain/CommunityMother'
import { CommunityMother as CoreCommunityMother } from '@Tests/Contexts/Core/Community/domain/CommunityMother'
import { CommunityDeletedDomainEvent as CoreCommunityDeletedDomainEvent } from '@Core/Community/domain/Events/CommunityDeletedDomainEvent'
import { DeletedAt } from '@Core/Community/domain/ValueObjects/DeletedAt'
import { CommunityDeletedDomainEvent } from '@Threads/Community/domain/Events/CommunityDeletedDomainEvent'

let eventBus: EventBusMock
let repository: CommunityRepositoryMock
let handler: DeleteCommunityOnCommunityDeletedHandler
let deleter: Deleter

describe('DeleteCommunityOnCommunityDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new CommunityRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteCommunityOnCommunityDeletedHandler(deleter)
  })

  test('Create community', async () => {
    const coreCommunity = CoreCommunityMother.create({
      deletedAt: new DeletedAt(new Date())
    })

    const existingCommunity = CommunityMother.create({ id: coreCommunity.id })

    repository.returnOnFind(existingCommunity)

    const event = CoreCommunityDeletedDomainEvent.fromAggregate(coreCommunity)

    await handler.on(event)

    repository.assertDeleteHasBeenCalledWith(existingCommunity)
  })

  test('Dont do anything if the community doesnt exists exists', async () => {
    const coreCommunity = CoreCommunityMother.create({
      deletedAt: new DeletedAt(new Date())
    })

    const event = CoreCommunityDeletedDomainEvent.fromAggregate(coreCommunity)

    await handler.on(event)

    repository.assertDeleteHasNotBeenCalled()
  })

  test('Create a new CommunityDeletedDomainEvent', async () => {
    const coreCommunity = CoreCommunityMother.create({
      deletedAt: new DeletedAt(new Date())
    })

    const existingCommunity = CommunityMother.create({ id: coreCommunity.id })

    repository.returnOnFind(existingCommunity)

    const event = CoreCommunityDeletedDomainEvent.fromAggregate(coreCommunity)

    await handler.on(event)

    const expectedEvent = CommunityDeletedDomainEvent.fromAggregate(existingCommunity)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
