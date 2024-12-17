import { DeleteCommunitiesOnParentCommunityDeletedHandler } from '@Core/Community/application/DeleteCommunitiesOnParentCommunityDeleted/DeleteCommunitiesOnParentCommunityDeletedHandler'
import { Deleter } from '@Core/Community/application/DeleteCommunitiesOnParentCommunityDeleted/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { CommunityRepositoryMock } from '../../__mocks__/CommunityRepositoryMock'
import { CommunityDeletedDomainEvent } from '@Core/Community/domain/Events/CommunityDeletedDomainEvent'
import { CommunityMother } from '@Tests/Contexts/Core/Community/domain/CommunityMother'
import { DeletedAt } from '@Core/Community/domain/ValueObjects/DeletedAt'

let eventBus: EventBusMock
let repository: CommunityRepositoryMock
let handler: DeleteCommunitiesOnParentCommunityDeletedHandler
let deleter: Deleter

describe('DeleteCommunitiesOnParentCommunityDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new CommunityRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteCommunitiesOnParentCommunityDeletedHandler(deleter)
  })

  test('Delete community', async () => {
    const existingCommunity = CommunityMother.create({
      deletedAt: new DeletedAt(new Date())
    })

    const toModifyCommunity = CommunityMother.create({ parentId: existingCommunity.id })

    const communityCollection = [toModifyCommunity]

    repository.returnOnSearch(communityCollection)

    const event = CommunityDeletedDomainEvent.fromAggregate(existingCommunity)

    await handler.on(event)

    const expectedCommunity = CommunityMother.create({
      ...toModifyCommunity,
      deletedAt: new DeletedAt(new Date())
    })

    repository.assertPersistHasBeenCalledWith(expectedCommunity)
  })

  test('update a new CommunityDeletedDomainEvent', async () => {
    const existingCommunity = CommunityMother.create({
      deletedAt: new DeletedAt(new Date())
    })

    const toModifyCommunity = CommunityMother.create({ parentId: existingCommunity.id })

    const communityCollection = [toModifyCommunity]

    repository.returnOnSearch(communityCollection)

    const event = CommunityDeletedDomainEvent.fromAggregate(existingCommunity)

    await handler.on(event)

    const expectedCommunity = CommunityMother.create({
      ...toModifyCommunity,
      deletedAt: new DeletedAt(new Date())
    })

    const expectedEvent = CommunityDeletedDomainEvent.fromAggregate(expectedCommunity)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
