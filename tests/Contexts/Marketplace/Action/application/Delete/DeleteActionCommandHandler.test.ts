import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { ActionRepositoryMock } from '../../__mocks__/ActionRepositoryMock'
import { DeleteActionCommandHandler } from '@Marketplace/Action/application/Delete/DeleteActionCommandHandler'
import { Deleter } from '@Marketplace/Action/application/Delete/Deleter'
import { ActionMother } from '../../domain/ActionMother'
import { DeleteActionCommandMother } from './DeleteActionCommandMother'
import { ActionDeletedDomainEvent } from '@Marketplace/Action/domain/Events/ActionDeletedDomainEvent'

let eventBus: EventBusMock
let repository: ActionRepositoryMock
let handler: DeleteActionCommandHandler
let deleter: Deleter

describe('DeleteActionCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new ActionRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteActionCommandHandler(deleter)
  })

  test('Delete a action', async () => {
    const action = ActionMother.random()

    repository.returnOnFind(action)

    const command = DeleteActionCommandMother.fromAggregate(action)

    await handler.handle(command)

    const expectedAction = ActionMother.create({
      ...action
    })

    repository.assertDeleteHasBeenCalledWith(expectedAction)
  })

  test('Fail if a action with the same id doesnt exists', async () => {
    const action = ActionMother.random()

    const command = DeleteActionCommandMother.fromAggregate(action)

    await handler.handle(command)

    repository.assertDeleteHasNotBeenCalled()
  })

  test('Create a new ActionDeletedDomainEvent', async () => {
    const action = ActionMother.random()

    repository.returnOnFind(action)

    const command = DeleteActionCommandMother.fromAggregate(action)

    await handler.handle(command)

    const expectedAction = ActionMother.create({
      ...action
    })

    const expectedEvent = ActionDeletedDomainEvent.fromAggregate(expectedAction)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
