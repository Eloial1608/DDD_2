import { UpdateUserIsAdminOnUserIsAdminUpdatedHandler } from '@Metrics/User/application/UpdateUserIsAdminOnUserIsAdminUpdated/UpdateUserIsAdminOnUserIsAdminUpdatedHandler'
import { Updater } from '@Metrics/User/application/UpdateUserIsAdminOnUserIsAdminUpdated/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UserMother } from '../../domain/UserMother'
import { UserMother as CoreUserMother } from '@Tests/Contexts/Core/User/domain/UserMother'
import { UserUpdatedIsAdminDomainEvent as CoreUserIsAdminUpdatedDomainEvent } from '@Core/User/domain/Events/UserUpdatedIsAdminEvent'
import { UserIsAdminUpdatedDomainEvent } from '@Metrics/User/domain/Events/UserIsAdminUpdatedDomainEvent'
import { Username } from '@Metrics/User/domain/ValueObjects/Username'

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
