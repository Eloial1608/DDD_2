import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SessionRepositoryMock } from '../../__mocks__/SessionRepositoryMock'
import { CreateSessionCommandHandler } from '@Metrics/Session/application/Create/CreateSessionCommandHandler'
import { Creator } from '@Metrics/Session/application/Create/Creator'
import { SessionMother } from '../../domain/SessionMother'
import { CreateSessionCommandMother } from './CreateSessionCommandMother'
import { SessionCreatedDomainEvent } from '@Metrics/Session/domain/Events/CreatedSessionDomainEvent'

let eventBus: EventBusMock
let repository: SessionRepositoryMock
let handler: CreateSessionCommandHandler
let creator: Creator

describe('CreateSessionCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new SessionRepositoryMock()
    creator = new Creator(repository, eventBus)
    handler = new CreateSessionCommandHandler(creator)
  })

  test('Create a new session', async () => {
    const session = SessionMother.random()

    const command = CreateSessionCommandMother.fromAggregate(session)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(session)
  })

  test('Fail if a session with the same id already exists', async () => {
    const session = SessionMother.random()

    const existingSession = SessionMother.create({ id: session.id })

    const command = CreateSessionCommandMother.fromAggregate(session)

    repository.returnOnFind(existingSession)

    await handler.handle(command)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new SessionCreatedDomainEvent', async () => {
    const session = SessionMother.random()

    const command = CreateSessionCommandMother.fromAggregate(session)

    await handler.handle(command)

    const expectedEvent = SessionCreatedDomainEvent.fromAggregate(session)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
