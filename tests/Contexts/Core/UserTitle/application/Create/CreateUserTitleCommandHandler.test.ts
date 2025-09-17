import { CreateUserTitleCommandHandler } from '@Core/UserTitle/application/Create/CreateUserTitleCommandHandler'
import { Creator } from '@Core/UserTitle/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserTitleRepositoryMock } from '../../__mocks__/UserTitleRepositoryMock'
import { UserTitleMother } from '../../domain/UserTitleMother'
import { CreateUserTitleCommandMother } from './CreateUserTitleCommandMother'
import { UserTitleAlreadyExistsById } from '@Core/UserTitle/domain/Errors/UserTitleAlreadyExistsById'
import { UserTitleCreatedDomainEvent } from '@Core/UserTitle/domain/Events/UserTitleCreatedDomainEvent'

let eventBus: EventBusMock
let repository: UserTitleRepositoryMock
let handler: CreateUserTitleCommandHandler
let creator: Creator

describe('CreateUserTitleCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserTitleRepositoryMock()
    creator = new Creator(repository, eventBus)
    handler = new CreateUserTitleCommandHandler(creator)
  })

  test('Create a new userTitle', async () => {
    const userTitle = UserTitleMother.random()
    const command = CreateUserTitleCommandMother.fromAggregate(userTitle)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(userTitle)
  })

  test('Fail if a userTitle with the same id already exists', async () => {
    const userTitle = UserTitleMother.random()
    const existing = UserTitleMother.create({ id: userTitle.id })

    const command = CreateUserTitleCommandMother.fromAggregate(userTitle)

    repository.returnOnFind(existing)

    expect(handler.handle(command)).rejects.toThrow(UserTitleAlreadyExistsById)
  })

  test('Create a new UserTitleCreatedDomainEvent', async () => {
    const userTitle = UserTitleMother.random()
    const command = CreateUserTitleCommandMother.fromAggregate(userTitle)

    await handler.handle(command)

    const expectedEvent = UserTitleCreatedDomainEvent.fromAggregate(userTitle)
    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
