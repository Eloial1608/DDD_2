import { DeleteUserTitleCommandHandler } from '@Core/UserTitle/application/Delete/DeleteUserTitleCommandHandler'
import { Deleter } from '@Core/UserTitle/application/Delete/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserTitleRepositoryMock } from '../../__mocks__/UserTitleRepositoryMock'
import { UserTitleMother } from '../../domain/UserTitleMother'
import { DeleteUserTitleCommandMother } from './DeleteUserTitleCommandMother'
import { UserTitleDeletedDomainEvent } from '@Core/UserTitle/domain/Events/UserTitleDeletedDomainEvent'
import { DeletedAt } from '@Core/UserTitle/domain/ValueObjects/DeletedAt'

let eventBus: EventBusMock
let repository: UserTitleRepositoryMock
let handler: DeleteUserTitleCommandHandler
let deleter: Deleter

describe('DeleteUserTitleCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserTitleRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteUserTitleCommandHandler(deleter)
  })

  test('Delete a userTitle', async () => {
    const userTitle = UserTitleMother.create({ deletedAt: new DeletedAt(new Date()) })
    const existing = UserTitleMother.create({ ...userTitle })

    repository.returnOnFind(existing)

    const command = DeleteUserTitleCommandMother.fromAggregate(userTitle)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(userTitle)
  })

  test('Delete a new UserTitleDeletedDomainEvent', async () => {
    const userTitle = UserTitleMother.random()
    const existing = UserTitleMother.create({ ...userTitle, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteUserTitleCommandMother.fromAggregate(userTitle)

    await handler.handle(command)

    const expectedEvent = UserTitleDeletedDomainEvent.fromAggregate(userTitle)
    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
