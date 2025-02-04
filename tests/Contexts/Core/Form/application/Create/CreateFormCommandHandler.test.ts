import { CreateFormCommandHandler } from '@Core/Form/application/Create/CreateFormCommandHandler'
import { Creator } from '@Core/Form/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { FormRepositoryMock } from '../../__mocks__/FormRepositoryMock'
import { FormMother } from '../../domain/FormMother'
import { CreateFormCommandMother } from './CreateFormCommandMother'
import { FormCreatedDomainEvent } from '@Core/Form/domain/Events/FormCreatedDomainEvent'

let eventBus: EventBusMock
let repository: FormRepositoryMock
let handler: CreateFormCommandHandler
let creator: Creator

describe('CreateFormCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new FormRepositoryMock()
    creator = new Creator(repository, eventBus)
    handler = new CreateFormCommandHandler(creator)
  })

  test('Create a new form', async () => {
    const form = FormMother.random()

    const command = CreateFormCommandMother.fromAggregate(form)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(form)
  })

  test('Create a new FormCreatedDomainEvent', async () => {
    const form = FormMother.random()

    const command = CreateFormCommandMother.fromAggregate(form)

    await handler.handle(command)

    const expectedEvent = FormCreatedDomainEvent.fromAggregate(form)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
