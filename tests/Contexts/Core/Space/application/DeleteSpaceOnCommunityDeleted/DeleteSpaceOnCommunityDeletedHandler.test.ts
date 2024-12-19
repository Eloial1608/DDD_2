import { DeleteSpaceOnCommunityDeletedHandler } from '@Core/Space/application/DeleteSpaceOnCommunityDeleted/DeleteSpaceOnCommunityDeletedHandler'
import { Deleter } from '@Core/Space/application/DeleteSpaceOnCommunityDeleted/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SpaceRepositoryMock } from '../../__mocks__/SpaceRepositoryMock'
import { SpaceMother } from '../../domain/SpaceMother'
import { SpaceDeletedDomainEvent } from '@Core/Space/domain/Events/SpaceDeletedDomainEvent'
import { CommunityMother } from '@Tests/Contexts/Core/Community/domain/CommunityMother'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { DeletedAt } from '@Core/Space/domain/ValueObjects/DeletedAt'
import { CommunityDeletedDomainEvent } from '@Core/Community/domain/Events/CommunityDeletedDomainEvent'

let eventBus: EventBusMock
let repository: SpaceRepositoryMock
let handler: DeleteSpaceOnCommunityDeletedHandler
let deleter: Deleter

describe('DeleteSpaceOnCommunityDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new SpaceRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteSpaceOnCommunityDeletedHandler(deleter)
  })

  test('Delete space', async () => {
    const existignSpace = SpaceMother.random()

    const community = CommunityMother.create({
      id: new Id(existignSpace.communityId.valueOf()),
      deletedAt: new DeletedAt(new Date())
    })

    const spaceCollection = [existignSpace]

    repository.returnOnSearch(spaceCollection)

    const event = CommunityDeletedDomainEvent.fromAggregate(community)

    await handler.on(event)

    const expectedSpace = SpaceMother.create({
      ...existignSpace,
      deletedAt: new DeletedAt(new Date())
    })

    repository.assertPersistHasBeenCalledWith(expectedSpace)
  })

  test('update a new SpaceDeletedDomainEvent', async () => {
    const existignSpace = SpaceMother.random()

    const community = CommunityMother.create({
      id: new Id(existignSpace.communityId.valueOf()),
      deletedAt: new DeletedAt(new Date())
    })

    const spaceCollection = [existignSpace]

    repository.returnOnSearch(spaceCollection)

    const event = CommunityDeletedDomainEvent.fromAggregate(community)

    await handler.on(event)

    const expectedSpace = SpaceMother.create({
      ...existignSpace,
      deletedAt: new DeletedAt(new Date())
    })

    const expectedEvent = SpaceDeletedDomainEvent.fromAggregate(expectedSpace)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
