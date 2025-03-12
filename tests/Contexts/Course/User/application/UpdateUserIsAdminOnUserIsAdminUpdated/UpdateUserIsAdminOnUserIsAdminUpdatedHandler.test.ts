import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserMother as CoreUserMother } from '@Tests/Contexts/Core/User/domain/UserMother'
import { UserUpdatedIsAdminDomainEvent as CoreUserIsAdminUpdatedDomainEvent } from '@Core/User/domain/Events/UserUpdatedIsAdminEvent'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UpdateUserIsAdminOnUserIsAdminUpdatedHandler } from '@Course/User/application/UpdateUserIsAdminOnUserIsAdminUpdated/UpdateUserIsAdminOnUserIsAdminUpdatedHandler'
import { Updater } from '@Course/User/application/UpdateUserIsAdminOnUserIsAdminUpdated/Updater'
import { UserMother } from '../../domain/UserMother'
import { Username } from '@Course/User/domain/ValueObjects/Username'
import { UserIsAdminUpdatedDomainEvent } from '@Course/User/domain/Events/UserIsAdminUpdatedDomainEvent'

let eventBus: EventBusMock
let repository: UserRepositoryMock
let handler: UpdateUserIsAdminOnUserIsAdminUpdatedHandler
let updater: Updater

describe('UpdateUserIsAdminOnUserIsAdminUpdatedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateUserIsAdminOnUserIsAdminUpdatedHandler(updater)
  })

  test('Update user', async () => {
    const coreUser = CoreUserMother.random()

    const existingUser = UserMother.create({
      ...coreUser,
      username: new Username(coreUser.username.valueOf())
    })

    repository.returnOnFind(existingUser)

    const event = CoreUserIsAdminUpdatedDomainEvent.fromAggregate(coreUser)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(existingUser)
  })

  test('Dont do anything if the user doesnt exists', async () => {
    const coreUser = CoreUserMother.random()

    const event = CoreUserIsAdminUpdatedDomainEvent.fromAggregate(coreUser)

    await handler.on(event)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a UserIsAdminUpdatedDomainEvent', async () => {
    const coreUser = CoreUserMother.random()

    const existingUser = UserMother.create({
      ...coreUser,
      username: new Username(coreUser.username.valueOf())
    })

    repository.returnOnFind(existingUser)

    const event = CoreUserIsAdminUpdatedDomainEvent.fromAggregate(coreUser)

    await handler.on(event)

    const expectedEvent = UserIsAdminUpdatedDomainEvent.fromAggregate(existingUser)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
