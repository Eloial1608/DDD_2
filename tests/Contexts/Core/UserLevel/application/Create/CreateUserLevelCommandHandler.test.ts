import { CreateUserLevelCommandHandler } from '@Core/UserLevel/application/Create/CreateUserLevelCommandHandler'
import { Creator } from '@Core/UserLevel/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserLevelRepositoryMock } from '../../__mocks__/UserLevelRepositoryMock'
import { UserLevelMother } from '../../domain/UserLevelMother'
import { CreateUserLevelCommandMother } from './CreateUserLevelCommandMother'
import { UserLevelAlreadyExistsById } from '@Core/UserLevel/domain/Errors/UserLevelAlreadyExistsById'
import { UserLevelCreatedDomainEvent } from '@Core/UserLevel/domain/Events/UserLevelCreatedDomainEvent'

let eventBus: EventBusMock
let repository: UserLevelRepositoryMock
let handler: CreateUserLevelCommandHandler
let creator: Creator

describe('CreateUserLevelCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserLevelRepositoryMock()
    creator = new Creator(repository, eventBus)
    handler = new CreateUserLevelCommandHandler(creator)
  })

  test('Create a new userLevel', async () => {
    const userLevel = UserLevelMother.random()

    const command = CreateUserLevelCommandMother.fromAggregate(userLevel)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(userLevel)
  })

  test('Fail if a userLevel with the same id already exists', async () => {
    const userLevel = UserLevelMother.random()
    const existingUserLevel = UserLevelMother.create({ id: userLevel.id })

    const command = CreateUserLevelCommandMother.fromAggregate(userLevel)

    repository.returnOnFind(existingUserLevel)

    expect(handler.handle(command)).rejects.toThrow(UserLevelAlreadyExistsById)
  })

  test('Create a new UserLevelCreatedDomainEvent', async () => {
    const userLevel = UserLevelMother.random()

    const command = CreateUserLevelCommandMother.fromAggregate(userLevel)

    await handler.handle(command)

    const expectedEvent = UserLevelCreatedDomainEvent.fromAggregate(userLevel)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
