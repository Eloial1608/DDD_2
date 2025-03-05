import { UpdateUserOnUserUpdatedHandler } from '@Media/User/application/UpdateUserOnUserUpdated/UpdateUserOnUserUpdatedHandler'
import { Updater } from '@Media/User/application/UpdateUserOnUserUpdated/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UserMother } from '../../domain/UserMother'
import { UserMother as CoreUserMother } from '@Tests/Contexts/Core/User/domain/UserMother'
import { UserUpdatedAboutAndNameDomainEvent as CoreUserUpdatedDomainEvent } from '@Core/User/domain/Events/UserUpdatedAboutAndNameEvent'
import { UserUpdatedDomainEvent } from '@Media/User/domain/Events/UserUpdatedDomainEvent'
import { Username } from '@Media/User/domain/ValueObjects/Username'

let eventBus: EventBusMock
let repository: UserRepositoryMock
let handler: UpdateUserOnUserUpdatedHandler
let updater: Updater

describe('UpdateUserOnUserUpdatedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateUserOnUserUpdatedHandler(updater)
  })

  test('Update user', async () => {
    const coreUser = CoreUserMother.random()

    const existingUser = UserMother.create({
      ...coreUser,
      username: new Username(coreUser.username.valueOf())
    })

    repository.returnOnFind(existingUser)

    const event = CoreUserUpdatedDomainEvent.fromAggregate(coreUser)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(existingUser)
  })

  test('Dont do anything if the user doesnt exists', async () => {
    const coreUser = CoreUserMother.random()

    const event = CoreUserUpdatedDomainEvent.fromAggregate(coreUser)

    await handler.on(event)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a UserUpdatedDomainEvent', async () => {
    const coreUser = CoreUserMother.random()

    const existingUser = UserMother.create({
      ...coreUser,
      username: new Username(coreUser.username.valueOf())
    })

    repository.returnOnFind(existingUser)

    const event = CoreUserUpdatedDomainEvent.fromAggregate(coreUser)

    await handler.on(event)

    const expectedEvent = UserUpdatedDomainEvent.fromAggregate(existingUser)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
