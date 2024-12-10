import { CreateSpaceMemberCommandHandler } from '@Core/SpaceMember/application/Create/CreateSpaceMemberCommandHandler'
import { Creator } from '@Core/SpaceMember/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SpaceMemberRepositoryMock } from '../../__mocks__/SpaceMemberRepositoryMock'
import { SpaceMemberMother } from '../../domain/SpaceMemberMother'
import { CreateSpaceMemberCommandMother } from './CreateSpaceMemberCommandMother'
import { SpaceMemberCreatedDomainEvent } from '@Core/SpaceMember/domain/Events/SpaceMemberCreatedDomainEvent'

let eventBus: EventBusMock
let repository: SpaceMemberRepositoryMock
let handler: CreateSpaceMemberCommandHandler
let creator: Creator

describe('CreateSpaceMemberCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new SpaceMemberRepositoryMock()
    creator = new Creator(repository, eventBus)
    handler = new CreateSpaceMemberCommandHandler(creator)
  })

  test('Create a new spacemember', async () => {
    const spacemember = SpaceMemberMother.random()

    const command = CreateSpaceMemberCommandMother.fromAggregate(spacemember)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(spacemember)
  })

  test('Create a new SpaceMemberCreatedDomainEvent', async () => {
    const spacemember = SpaceMemberMother.random()

    const command = CreateSpaceMemberCommandMother.fromAggregate(spacemember)

    await handler.handle(command)

    const expectedEvent = SpaceMemberCreatedDomainEvent.fromAggregate(spacemember)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
