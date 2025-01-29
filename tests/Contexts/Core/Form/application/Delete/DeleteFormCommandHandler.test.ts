import { DeleteFormCommandHandler } from '@Core/Form/application/Delete/DeleteFormCommandHandler'
import { Deleter } from '@Core/Form/application/Delete/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { FormRepositoryMock } from '../../__mocks__/FormRepositoryMock'
import { FormMother } from '../../domain/FormMother'
import { DeleteFormCommandMother } from './DeleteFormCommandMother'
import { FormDeletedDomainEvent } from '@Core/Form/domain/Events/FormDeletedDomainEvent'

let eventBus: EventBusMock
let repository: FormRepositoryMock
let handler: DeleteFormCommandHandler
let deleter: Deleter

describe('DeleteFormCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new FormRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteFormCommandHandler(deleter)
  })

  test('Delete a new form', async () => {
    const form = FormMother.random()

    repository.returnOnFind(form)

    const command = DeleteFormCommandMother.fromAggregate(form)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(form)
  })

  test('Delete a new FormDeletedDomainEvent', async () => {
    const form = FormMother.random()

    repository.returnOnFind(form)

    const command = DeleteFormCommandMother.fromAggregate(form)

    await handler.handle(command)

    const expectedEvent = FormDeletedDomainEvent.fromAggregate(form)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
