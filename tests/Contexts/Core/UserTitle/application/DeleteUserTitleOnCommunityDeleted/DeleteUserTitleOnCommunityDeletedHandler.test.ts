import { Deleter } from '@Core/UserTitle/application/DeleteUserTitleOnCommunityDeleted/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserTitleRepositoryMock } from '../../__mocks__/UserTitleRepositoryMock'
import { UserTitleMother } from '../../domain/UserTitleMother'
import { CommunityMother } from '@Tests/Contexts/Core/Community/domain/CommunityMother'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { DeletedAt } from '@Core/UserTitle/domain/ValueObjects/DeletedAt'
import { CommunityDeletedDomainEvent } from '@Core/Community/domain/Events/CommunityDeletedDomainEvent'
import { UserTitleDeletedDomainEvent } from '@Core/UserTitle/domain/Events/UserTitleDeletedDomainEvent'
import { DeleteUserTitleOnCommunityDeletedHandler } from '@Core/UserTitle/application/DeleteUserTitleOnCommunityDeleted/DeleteUserTitleOnCommunityDeletedHandler'

let eventBus: EventBusMock
let repository: UserTitleRepositoryMock
let handler: DeleteUserTitleOnCommunityDeletedHandler
let deleter: Deleter

describe('DeleteUserTitleOnCommunityDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserTitleRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteUserTitleOnCommunityDeletedHandler(deleter)
  })

  test('Delete userTitle', async () => {
    const existingUserTitle = UserTitleMother.random()

    const community = CommunityMother.create({
      id: new Id(existingUserTitle.communityId.valueOf()),
      deletedAt: new DeletedAt(new Date())
    })

    const userTitleCollection = [existingUserTitle]

    repository.returnOnSearch(userTitleCollection)

    const event = CommunityDeletedDomainEvent.fromAggregate(community)

    await handler.on(event)

    const expectedUserTitle = UserTitleMother.create({
      ...existingUserTitle,
      deletedAt: new DeletedAt(new Date())
    })

    repository.assertPersistHasBeenCalledWith(expectedUserTitle)
  })

  test('update a new UserTitleDeletedDomainEvent', async () => {
    const existingUserTitle = UserTitleMother.random()

    const community = CommunityMother.create({
      id: new Id(existingUserTitle.communityId.valueOf()),
      deletedAt: new DeletedAt(new Date())
    })

    const userTitleCollection = [existingUserTitle]

    repository.returnOnSearch(userTitleCollection)

    const event = CommunityDeletedDomainEvent.fromAggregate(community)

    await handler.on(event)

    const expectedUserTitle = UserTitleMother.create({
      ...existingUserTitle
    })

    const expectedEvent = UserTitleDeletedDomainEvent.fromAggregate(expectedUserTitle)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
