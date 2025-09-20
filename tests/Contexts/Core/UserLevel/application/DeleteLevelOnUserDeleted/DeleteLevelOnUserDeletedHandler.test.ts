import { Deleter } from '@Core/UserLevel/application/DeleteUserLevelOnUserDeleted/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserLevelRepositoryMock } from '../../__mocks__/UserLevelRepositoryMock'
import { UserLevelMother } from '../../domain/UserLevelMother'
import { UserLevelDeletedDomainEvent } from '@Core/UserLevel/domain/Events/UserLevelDeletedDomainEvent'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { DeletedAt } from '@Core/User/domain/ValueObjects/DeletedAt'
import { DeleteUserLevelOnUserDeletedHandler } from '@Core/UserLevel/application/DeleteUserLevelOnUserDeleted/DeleteUserLevelOnUserDeletedHandler'
import { UserMother } from '@Tests/Contexts/Core/User/domain/UserMother'
import { UserDeletedDomainEvent } from '@Core/User/domain/Events/UserDeletedDomainEvent'

let eventBus: EventBusMock
let repository: UserLevelRepositoryMock
let handler: DeleteUserLevelOnUserDeletedHandler
let deleter: Deleter

describe('Delete UserLevelOnUserDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserLevelRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteUserLevelOnUserDeletedHandler(deleter)
  })

  test('Delete userlevel', async () => {
    const existignUserLevel = UserLevelMother.random()

    const user = UserMother.create({
      id: new Id(existignUserLevel.userId.valueOf()),
      deletedAt: new DeletedAt(new Date())
    })

    const userlevelCollection = [existignUserLevel]

    repository.returnOnSearch(userlevelCollection)

    const event = UserDeletedDomainEvent.fromAggregate(user)

    await handler.on(event)

    const expectedUserLevel = UserLevelMother.create({
      ...existignUserLevel
    })

    repository.assertPersistHasBeenCalledWith(expectedUserLevel)
  })

  test('update a new UserLevelDeletedDomainEvent', async () => {
    const existignUserLevel = UserLevelMother.random()

    const user = UserMother.create({
      id: new Id(existignUserLevel.userId.valueOf()),
      deletedAt: new DeletedAt(new Date())
    })

    const userlevelCollection = [existignUserLevel]

    repository.returnOnSearch(userlevelCollection)

    const event = UserDeletedDomainEvent.fromAggregate(user)

    await handler.on(event)

    const expectedUserLevel = UserLevelMother.create({
      ...existignUserLevel
    })

    const expectedEvent = UserLevelDeletedDomainEvent.fromAggregate(expectedUserLevel)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
