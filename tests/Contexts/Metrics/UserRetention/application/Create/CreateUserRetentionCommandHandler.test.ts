import { Creator } from '@Metrics/UserRetention/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserRetentionRepositoryMock } from '../../__mocks__/UserRetentionRepositoryMock'
import { UserRetentionMother } from '../../domain/UserRetentionMother'
import { CreateUserRetentionCommandMother } from './CreateUserRetentionCommandMother'
import { UserRetentionCreatedDomainEvent } from '@Metrics/UserRetention/domain/Events/UserRetentionCreatedDomainEvent'
import { CreateUserRetentionCommandHandler } from '@Metrics/UserRetention/application/Create/CreateUserRetentionCommandHandler'

let eventBus: EventBusMock
let repository: UserRetentionRepositoryMock
let handler: CreateUserRetentionCommandHandler
let creator: Creator

describe('CreateUserRetentionCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserRetentionRepositoryMock()
    creator = new Creator(repository, eventBus)
    handler = new CreateUserRetentionCommandHandler(creator)
  })

  test('Create a new userretention', async () => {
    const userretention = UserRetentionMother.random()

    const command = CreateUserRetentionCommandMother.fromAggregate(userretention)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(userretention)
  })

  test('Create a new UserRetentionCreatedDomainEvent', async () => {
    const userretention = UserRetentionMother.random()

    const command = CreateUserRetentionCommandMother.fromAggregate(userretention)

    await handler.handle(command)

    const expectedEvent = UserRetentionCreatedDomainEvent.fromAggregate(userretention)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
