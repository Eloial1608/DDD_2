import { DeleteUserOnUserDeletedHandler } from '@Projects/User/application/DeleteUserOnUserDeleted/DeleteUserOnUserDeletedHandler'
import { Deleter } from '@Projects/User/application/DeleteUserOnUserDeleted/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UserMother } from '../../domain/UserMother'
import { UserMother as CoreUserMother } from '@Tests/Contexts/Core/User/domain/UserMother'
import { UserDeletedDomainEvent as CoreUserDeletedDomainEvent } from '@Core/User/domain/Events/UserDeletedDomainEvent'
import { DeletedAt } from '@Core/User/domain/ValueObjects/DeletedAt'
import { UserDeletedDomainEvent } from '@Projects/User/domain/Events/UserDeletedDomainEvent'

let eventBus: EventBusMock
let repository: UserRepositoryMock
let handler: DeleteUserOnUserDeletedHandler
let deleter: Deleter

describe('DeleteUserOnUserDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteUserOnUserDeletedHandler(deleter)
  })

  test('Create user', async () => {
    const coreUser = CoreUserMother.create({
      deletedAt: new DeletedAt(new Date())
    })

    const existingUser = UserMother.create({ id: coreUser.id })

    repository.returnOnFind(existingUser)

    const event = CoreUserDeletedDomainEvent.fromAggregate(coreUser)

    await handler.on(event)

    repository.assertDeleteHasBeenCalledWith(existingUser)
  })

  test('Dont do anything if the user doesnt exists exists', async () => {
    const coreUser = CoreUserMother.create({
      deletedAt: new DeletedAt(new Date())
    })

    const event = CoreUserDeletedDomainEvent.fromAggregate(coreUser)

    await handler.on(event)

    repository.assertDeleteHasNotBeenCalled()
  })

  test('Create a new UserDeletedDomainEvent', async () => {
    const coreUser = CoreUserMother.create({
      deletedAt: new DeletedAt(new Date())
    })

    const existingUser = UserMother.create({ id: coreUser.id })

    repository.returnOnFind(existingUser)

    const event = CoreUserDeletedDomainEvent.fromAggregate(coreUser)

    await handler.on(event)

    const expectedEvent = UserDeletedDomainEvent.fromAggregate(existingUser)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
