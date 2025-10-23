import { CreateSpaceMemberOnSpaceMemberCreatedHandler } from '@Projects/SpaceMember/application/CreateSpaceMemberOnSpaceMemberCreated/CreateSpaceMemberOnSpaceMemberCreatedHandler'
import { Creator } from '@Projects/SpaceMember/application/CreateSpaceMemberOnSpaceMemberCreated/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SpaceMemberRepositoryMock } from '../../__mocks__/SpaceMemberRepositoryMock'
import { SpaceMemberMother } from '../../domain/SpaceMemberMother'
import { SpaceMemberMother as CoreSpaceMemberMother } from '@Tests/Contexts/Core/SpaceMember/domain/SpaceMemberMother'
import { SpaceMemberCreatedDomainEvent as CoreSpaceMemberCreatedDomainEvent } from '@Core/SpaceMember/domain/Events/SpaceMemberCreatedDomainEvent'
import { SpaceMemberCreatedDomainEvent } from '@Projects/SpaceMember/domain/Events/SpaceMemberCreatedDomainEvent'

let eventBus: EventBusMock
let repository: SpaceMemberRepositoryMock
let handler: CreateSpaceMemberOnSpaceMemberCreatedHandler
let creator: Creator

describe('CreateSpaceMemberOnSpaceMemberCreatedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new SpaceMemberRepositoryMock()
    creator = new Creator(repository, eventBus)
    handler = new CreateSpaceMemberOnSpaceMemberCreatedHandler(creator)
  })

  test('Create spaceMember', async () => {
    const coreSpaceMember = CoreSpaceMemberMother.random()

    const existingSpaceMember = SpaceMemberMother.create(coreSpaceMember)

    const event = CoreSpaceMemberCreatedDomainEvent.fromAggregate(coreSpaceMember)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(existingSpaceMember)
  })

  test('Dont do anything if the spaceMember already exists', async () => {
    const coreSpaceMember = CoreSpaceMemberMother.random()

    const existingSpaceMember = SpaceMemberMother.create(coreSpaceMember)

    repository.returnOnFind(existingSpaceMember)

    const event = CoreSpaceMemberCreatedDomainEvent.fromAggregate(coreSpaceMember)

    await handler.on(event)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new SpaceMemberCreatedDomainEvent', async () => {
    const coreSpaceMember = CoreSpaceMemberMother.random()

    const existingSpaceMember = SpaceMemberMother.create(coreSpaceMember)

    const event = CoreSpaceMemberCreatedDomainEvent.fromAggregate(coreSpaceMember)

    await handler.on(event)

    const expectedEvent = SpaceMemberCreatedDomainEvent.fromAggregate(existingSpaceMember)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
