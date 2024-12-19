import { DeleteUserCommandHandler } from '@Core/User/application/Delete/DeleteUserCommandHandler'
import { Deleter } from '@Core/User/application/Delete/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UserMother } from '../../domain/UserMother'
import { DeleteUserCommandMother } from './DeleteUserCommandMother'
import { UserDeletedDomainEvent } from '@Core/User/domain/Events/UserDeletedDomainEvent'
import { DeletedAt } from '@Core/User/domain/ValueObjects/DeletedAt'

let eventBus: EventBusMock
let repository: UserRepositoryMock
let handler: DeleteUserCommandHandler
let deleter: Deleter

describe('DeleteUserCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteUserCommandHandler(deleter)
  })

  test('Delete an user', async () => {
    const user = UserMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = UserMother.create({ ...user, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteUserCommandMother.fromAggregate(user)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(user)
  })

  test('Create a new UserDeletedDomainEvent', async () => {
    const user = UserMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = UserMother.create({ ...user, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteUserCommandMother.fromAggregate(user)

    await handler.handle(command)

    const expectedEvent = UserDeletedDomainEvent.fromAggregate(user)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
