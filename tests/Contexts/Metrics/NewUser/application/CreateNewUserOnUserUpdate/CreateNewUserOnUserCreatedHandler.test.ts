import { CreateNewUserOnUserCreateHandler } from '@Metrics/NewUser/application/CreateNewUserOnUserCreate/CreateNewUserOnUserCreateHandler'
import { Creator } from '@Metrics/NewUser/application/CreateNewUserOnUserCreate/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { NewUserRepositoryMock } from '../../__mocks__/NewUserRepositoryMock'
import { NewUserMother } from '../../domain/NewUserMother'
import { UserMother as CoreUserMother } from '@Tests/Contexts/Core/User/domain/UserMother'
import { UserCreatedDomainEvent as CoreUserCreatedDomainEvent } from '@Core/User/domain/Events/UserCreatedDomainEvent'
import { NewUserCreatedDomainEvent } from '@Metrics/NewUser/domain/Events/NewUserCreatedDomainEvent'
import { Id } from '@Metrics/NewUser/domain/ValueObjects/Id'


let eventBus: EventBusMock
let repository: NewUserRepositoryMock
let handler: CreateNewUserOnUserCreateHandler
let creator: Creator


describe('CreateNewUserOnUserCreatedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new NewUserRepositoryMock()
    creator = new Creator(repository, eventBus,() => new Id('550e8400-e29b-41d4-a716-446655440000'))
    handler = new CreateNewUserOnUserCreateHandler(creator)
  })

  test('Create newUser', async () => {
    const coreUser = CoreUserMother.random()

    const event = CoreUserCreatedDomainEvent.fromAggregate(coreUser)

    await handler.on(event)
     const existing =NewUserMother.create({
      id: new Id('550e8400-e29b-41d4-a716-446655440000'),
      userId: coreUser.id,
      communityId: coreUser.communityId,
    })
 
    repository.assertPersistHasBeenCalledWith(existing)
  })

  test('Dont do anything if the user already exists', async () => {
    const coreUser = CoreUserMother.random()

    const existingUser = NewUserMother.create({
      ...coreUser,
    })

    repository.returnOnFind(existingUser)

    const event = CoreUserCreatedDomainEvent.fromAggregate(coreUser)

    await handler.on(event)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new UserCreatedDomainEvent', async () => {
    const coreUser = CoreUserMother.random()

    const existingUser = NewUserMother.create({
    id: new Id('550e8400-e29b-41d4-a716-446655440000'),
    userId: coreUser.id,
    communityId: coreUser.communityId,
    })

    const event = CoreUserCreatedDomainEvent.fromAggregate(coreUser)

    await handler.on(event)

    const expectedEvent = NewUserCreatedDomainEvent.fromAggregate(existingUser)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
