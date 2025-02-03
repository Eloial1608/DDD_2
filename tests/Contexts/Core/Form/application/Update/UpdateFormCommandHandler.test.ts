import { UpdateFormCommandHandler } from '@Core/Form/application/Update/UpdateFormCommandHandler'
import { Updater } from '@Core/Form/application/Update/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { FormRepositoryMock } from '../../__mocks__/FormRepositoryMock'
import { FormMother } from '../../domain/FormMother'
import { UpdateFormCommandMother } from './UpdateFormCommandMother'
import { FormUpdatedDomainEvent } from '@Core/Form/domain/Events/FormUpdatedDomainEvent'

let eventBus: EventBusMock
let repository: FormRepositoryMock
let handler: UpdateFormCommandHandler
let updater: Updater

describe('UpdateFormCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new FormRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateFormCommandHandler(updater)
  })

  test('Update a form', async () => {
    const form = FormMother.random()

    repository.returnOnFind(FormMother.create({ id: form.id, communityId: form.communityId, createdBy: form.createdBy }))

    const command = UpdateFormCommandMother.fromAggregate(form)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(form)
  })

  test('Update a new FormUpdatedDomainEvent', async () => {
    const form = FormMother.random()

    repository.returnOnFind(FormMother.create({ id: form.id, communityId: form.communityId, createdBy: form.createdBy }))

    const command = UpdateFormCommandMother.fromAggregate(form)

    await handler.handle(command)

    const expectedEvent = FormUpdatedDomainEvent.fromAggregate(form)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
