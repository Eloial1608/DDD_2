import { Deleter } from '@Core/SpaceUserTitle/application/DeleteSpaceUserTitleOnCommunityDeleted/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SpaceUserTitleRepositoryMock } from '../../__mocks__/SpaceUserTitleRepositoryMock'
import { SpaceUserTitleMother } from '../../domain/SpaceUserTitleMother'
import { CommunityMother } from '@Tests/Contexts/Core/Community/domain/CommunityMother'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { DeletedAt } from '@Core/Community/domain/ValueObjects/DeletedAt'
import { CommunityDeletedDomainEvent } from '@Core/Community/domain/Events/CommunityDeletedDomainEvent'
import { SpaceUserTitleDeletedDomainEvent } from '@Core/SpaceUserTitle/domain/Events/SpaceUserTitleDeletedDomainEvent'
import { DeleteSpaceUserTitleOnCommunityDeletedHandler } from '@Core/SpaceUserTitle/application/DeleteSpaceUserTitleOnCommunityDeleted/DeleteSpaceOnCommunityDeletedHandler'

let eventBus: EventBusMock
let repository: SpaceUserTitleRepositoryMock
let handler: DeleteSpaceUserTitleOnCommunityDeletedHandler
let deleter: Deleter

describe('DeleteSpaceUserTitleOnCommunityDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new SpaceUserTitleRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteSpaceUserTitleOnCommunityDeletedHandler(deleter)
  })

  test('Delete spaceUserTitle', async () => {
    const existingSpaceUserTitle = SpaceUserTitleMother.random()

    const community = CommunityMother.create({
      id: new Id(existingSpaceUserTitle.communityId.valueOf()),
      deletedAt: new DeletedAt(new Date())
    })

    const spaceCollection = [existingSpaceUserTitle]

    repository.returnOnSearch(spaceCollection)

    const event = CommunityDeletedDomainEvent.fromAggregate(community)

    await handler.on(event)

    const expectedSpace = SpaceUserTitleMother.create({
      ...existingSpaceUserTitle
    })

    repository.assertDeleteHasBeenCalledWith(expectedSpace)
  })

  test('update a new SpaceUserTitleDeletedDomainEvent', async () => {
    const existingSpaceUserTitle = SpaceUserTitleMother.random()

    const community = CommunityMother.create({
      id: new Id(existingSpaceUserTitle.communityId.valueOf()),
      deletedAt: new DeletedAt(new Date())
    })

    const spaceCollection = [existingSpaceUserTitle]

    repository.returnOnSearch(spaceCollection)

    const event = CommunityDeletedDomainEvent.fromAggregate(community)

    await handler.on(event)

    const expectedSpace = SpaceUserTitleMother.create({
      ...existingSpaceUserTitle
    })

    const expectedEvent = SpaceUserTitleDeletedDomainEvent.fromAggregate(expectedSpace)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
