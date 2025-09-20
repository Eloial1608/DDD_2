import { DeleteUserLevelCommandHandler } from '@Core/UserLevel/application/Delete/DeleteUserLevelCommandHandler'
import { Deleter } from '@Core/UserLevel/application/Delete/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserLevelRepositoryMock } from '../../__mocks__/UserLevelRepositoryMock'
import { UserLevelMother } from '../../domain/UserLevelMother'
import { DeleteUserLevelCommandMother } from './DeleteUserLevelCommandMother'
import { UserLevelDeletedDomainEvent } from '@Core/UserLevel/domain/Events/UserLevelDeletedDomainEvent'

let eventBus: EventBusMock
let repository: UserLevelRepositoryMock
let handler: DeleteUserLevelCommandHandler
let deleter: Deleter

describe('DeleteUserLevelCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserLevelRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteUserLevelCommandHandler(deleter)
  })

  test('Delete a new userlevel', async () => {
    const userlevel = UserLevelMother.create({})

    const existing = UserLevelMother.create({ ...userlevel })

    repository.returnOnFind(existing)

    const command = DeleteUserLevelCommandMother.fromAggregate(userlevel)

    await handler.handle(command)

    repository.assertDeleteHasBeenCalledWith(userlevel)
  })

  test('Delete a new UserLevelDeletedDomainEvent', async () => {
    const userlevel = UserLevelMother.create({ })

    const existing = UserLevelMother.create({ ...userlevel })

    repository.returnOnFind(existing)

    const command = DeleteUserLevelCommandMother.fromAggregate(userlevel)

    await handler.handle(command)

    const expectedEvent = UserLevelDeletedDomainEvent.fromAggregate(userlevel)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
