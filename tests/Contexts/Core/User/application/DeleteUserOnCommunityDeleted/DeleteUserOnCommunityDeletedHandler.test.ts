import { DeleteUserOnCommunityDeletedHandler } from '@Core/User/application/DeleteUserOnCommunityDeleted/DeleteUserOnCommunityDeletedHandler'
import { Deleter } from '@Core/User/application/DeleteUserOnCommunityDeleted/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UserMother } from '../../domain/UserMother'
import { UserDeletedDomainEvent } from '@Core/User/domain/Events/UserDeletedDomainEvent'
import { CommunityMother } from '@Tests/Contexts/Core/Community/domain/CommunityMother'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { DeletedAt } from '@Core/User/domain/ValueObjects/DeletedAt'
import { CommunityDeletedDomainEvent } from '@Core/Community/domain/Events/CommunityDeletedDomainEvent'

let eventBus: EventBusMock
let repository: UserRepositoryMock
let handler: DeleteUserOnCommunityDeletedHandler
let deleter: Deleter

describe('DeleteUserOnCommunityDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteUserOnCommunityDeletedHandler(deleter)
  })

  test('Delete user', async () => {
    const existignUser = UserMother.random()

    const community = CommunityMother.create({
      id: new Id(existignUser.communityId.valueOf()),
      deletedAt: new DeletedAt(new Date())
    })

    const toModifyUser = UserMother.create({ mainId: existignUser.mainId })

    const userCollection = [toModifyUser]

    repository.returnOnSearch(userCollection)

    const event = CommunityDeletedDomainEvent.fromAggregate(community)

    await handler.on(event)

    const expectedUser = UserMother.create({
      ...toModifyUser,
      deletedAt: new DeletedAt(new Date())
    })

    repository.assertPersistHasBeenCalledWith(expectedUser)
  })

  test('update a new UserDeletedDomainEvent', async () => {
    const existignUser = UserMother.random()

    const community = CommunityMother.create({
      id: new Id(existignUser.communityId.valueOf()),
      deletedAt: new DeletedAt(new Date())
    })

    const toModifyUser = UserMother.create({ mainId: existignUser.mainId })

    const userCollection = [toModifyUser]

    repository.returnOnSearch(userCollection)

    const event = CommunityDeletedDomainEvent.fromAggregate(community)

    await handler.on(event)

    const expectedUser = UserMother.create({
      ...toModifyUser,
      deletedAt: new DeletedAt(new Date())
    })

    const expectedEvent = UserDeletedDomainEvent.fromAggregate(expectedUser)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
