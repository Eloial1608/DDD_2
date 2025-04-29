import { CreateUserOnUserCreatedHandler } from '@Marketplace/User/application/CreateUserOnUserCreated/CreateUserOnUserCreatedHandler'
import { Creator } from '@Marketplace/User/application/CreateUserOnUserCreated/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UserMother } from '../../domain/UserMother'
import { UserMother as CoreUserMother } from '@Tests/Contexts/Core/User/domain/UserMother'
import { UserCreatedDomainEvent as CoreUserCreatedDomainEvent } from '@Core/User/domain/Events/UserCreatedDomainEvent'
import { UserCreatedDomainEvent } from '@Marketplace/User/domain/Events/UserCreatedDomainEvent'
import { Username } from '@Marketplace/User/domain/ValueObjects/Username'

let eventBus: EventBusMock
let repository: UserRepositoryMock
let handler: CreateUserOnUserCreatedHandler
let creator: Creator

describe('CreateUserOnUserCreatedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserRepositoryMock()
    creator = new Creator(repository, eventBus)
    handler = new CreateUserOnUserCreatedHandler(creator)
  })

  test('Create user', async () => {
    const coreUser = CoreUserMother.random()

    const existingUser = UserMother.create({
      ...coreUser,
      username: new Username(coreUser.username.valueOf())
    })

    const event = CoreUserCreatedDomainEvent.fromAggregate(coreUser)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(existingUser)
  })

  test('Dont do anything if the user already exists', async () => {
    const coreUser = CoreUserMother.random()

    const existingUser = UserMother.create({
      ...coreUser,
      username: new Username(coreUser.username.valueOf())
    })

    repository.returnOnFind(existingUser)

    const event = CoreUserCreatedDomainEvent.fromAggregate(coreUser)

    await handler.on(event)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new UserCreatedDomainEvent', async () => {
    const coreUser = CoreUserMother.random()

    const existingUser = UserMother.create({
      ...coreUser,
      username: new Username(coreUser.username.valueOf())
    })

    const event = CoreUserCreatedDomainEvent.fromAggregate(coreUser)

    await handler.on(event)

    const expectedEvent = UserCreatedDomainEvent.fromAggregate(existingUser)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
