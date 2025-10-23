import { DeleteUserLevelOnCommunityDeletedHandler } from '@Core/UserLevel/application/DeleteUserLevelOnCommunityDeleted/DeleteUserLevelOnCommunityDeletedHandler'
import { Deleter } from '@Core/UserLevel/application/DeleteUserLevelOnCommunityDeleted/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserLevelRepositoryMock } from '../../__mocks__/UserLevelRepositoryMock'
import { UserLevelMother } from '../../domain/UserLevelMother'
import { UserLevelDeletedDomainEvent } from '@Core/UserLevel/domain/Events/UserLevelDeletedDomainEvent'
import { CommunityMother } from '@Tests/Contexts/Core/Community/domain/CommunityMother'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { DeletedAt } from '@Core/Community/domain/ValueObjects/DeletedAt'
import { CommunityDeletedDomainEvent } from '@Core/Community/domain/Events/CommunityDeletedDomainEvent'

let eventBus: EventBusMock
let repository: UserLevelRepositoryMock
let handler: DeleteUserLevelOnCommunityDeletedHandler
let deleter: Deleter

describe('Delete UserLevelOnCommunityDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserLevelRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteUserLevelOnCommunityDeletedHandler(deleter)
  })

  test('Delete userlevel', async () => {
    const existignUserLevel = UserLevelMother.random()

    const community = CommunityMother.create({
      id: new Id(existignUserLevel.communityId.valueOf()),
      deletedAt: new DeletedAt(new Date())
    })

    const userlevelCollection = [existignUserLevel]

    repository.returnOnSearch(userlevelCollection)

    const event = CommunityDeletedDomainEvent.fromAggregate(community)

    await handler.on(event)

    const expectedUserLevel = UserLevelMother.create({
      ...existignUserLevel
    })

    repository.assertPersistHasBeenCalledWith(expectedUserLevel)
  })

  test('update a new UserLevelDeletedDomainEvent', async () => {
    const existignUserLevel = UserLevelMother.random()

    const community = CommunityMother.create({
      id: new Id(existignUserLevel.communityId.valueOf()),
      deletedAt: new DeletedAt(new Date())
    })

    const userlevelCollection = [existignUserLevel]

    repository.returnOnSearch(userlevelCollection)

    const event = CommunityDeletedDomainEvent.fromAggregate(community)

    await handler.on(event)

    const expectedUserLevel = UserLevelMother.create({
      ...existignUserLevel
    })

    const expectedEvent = UserLevelDeletedDomainEvent.fromAggregate(expectedUserLevel)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
