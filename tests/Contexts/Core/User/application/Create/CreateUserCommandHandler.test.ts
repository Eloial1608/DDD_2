import { CreateUserCommandHandler } from '@Core/User/application/Create/CreateUserCommandHandler'
import { Creator } from '@Core/User/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UserMother } from '../../domain/UserMother'
import { CreateUserCommandMother } from './CreateUserCommandMother'
import { UserAlreadyExistsById } from '@Core/User/domain/Errors/UserAlreadyExistsById'
import { UserCreatedDomainEvent } from '@Core/User/domain/Events/UserCreatedDomainEvent'
import { UserAlreadyExistsByEmail } from '@Core/User/domain/Errors/UserAlreadyExistsBySuffix'

let eventBus: EventBusMock
let repository: UserRepositoryMock
let handler: CreateUserCommandHandler
let creator: Creator

describe('CreateUserCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserRepositoryMock()
    creator = new Creator(repository, eventBus)
    handler = new CreateUserCommandHandler(creator)
  })

  test('Create a new user', async () => {
    const user = UserMother.random()

    const command = CreateUserCommandMother.fromAggregate(user)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(user)
  })

  test('Fail if a user with the same id already exists', async () => {
    const user = UserMother.random()
    const existingUser = UserMother.create({ id: user.id })

    const command = CreateUserCommandMother.fromAggregate(user)

    repository.returnOnFind(existingUser)

    expect(handler.handle(command)).rejects.toThrow(UserAlreadyExistsById)
  })

  test('Fail if a user with the same suffix already exists', async () => {
    const user = UserMother.random()
    const existingUser = UserMother.create({ email: user.email })

    const command = CreateUserCommandMother.fromAggregate(user)

    repository.returnOnSearch([existingUser])

    expect(handler.handle(command)).rejects.toThrow(UserAlreadyExistsByEmail)
  })

  test('Create a new UserCreatedDomainEvent', async () => {
    const user = UserMother.random()

    const command = CreateUserCommandMother.fromAggregate(user)

    await handler.handle(command)

    const expectedEvent = UserCreatedDomainEvent.fromAggregate(user)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
