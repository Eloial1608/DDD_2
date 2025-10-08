import { UpdatePrincipalTitleCommandHandler } from '@Core/User/application/UpdatePrincipalTitle/UpdatePrincipalTitleCommandHandler'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UserMother } from '../../domain/UserMother'
import { UpdatePrincipalTitleCommandMother } from './UpdatePrincipalTitleCommandMother'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'
import { UserUpdatedPrincipalTitleDomainEvent } from '@Core/User/domain/Events/UserUpdatedPrincipalTitleEvent'
import { PrincipalTitle } from '@Core/User/domain/ValueObjects/PrincipalTitle'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { UpdaterPrincipalTitle } from '@Core/User/application/UpdatePrincipalTitle/UpdaterPrincipalTitle'

let eventBus: EventBusMock
let repository: UserRepositoryMock
let handler: UpdatePrincipalTitleCommandHandler
let updater: UpdaterPrincipalTitle

describe('UpdatePrincipalTitleCommandMother should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserRepositoryMock()
    updater = new UpdaterPrincipalTitle(repository, eventBus)
    handler = new UpdatePrincipalTitleCommandHandler(updater)
  })

  test('update not null principalTitle value', async () => {
    const user = UserMother.random()
    const existingUser = UserMother.create({
      ...user,
      principalTitle: new PrincipalTitle(UuidMother.random())
    })

    repository.returnOnFind(existingUser)
    repository.returnOnSearch([existingUser])

    const command = UpdatePrincipalTitleCommandMother.fromAggregate(user)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(user)
  })

  test('update null principalTitle value', async () => {
    const user = UserMother.random()
    const existingUser = UserMother.create({
      ...user,
      principalTitle: null
    })
    repository.returnOnFind(existingUser)
    repository.returnOnSearch([existingUser])

    const command = UpdatePrincipalTitleCommandMother.fromAggregate(user)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(user)
  })

  test('fail if a user dosent exists', async () => {
    const user = UserMother.random()
    const command = UpdatePrincipalTitleCommandMother.fromAggregate(user)

    expect(handler.handle(command)).rejects.toThrow(UserNotFound)
  })

  test('update a new UserUpdatedPrincipalTitleDomainEvent', async () => {
    const user = UserMother.random()
    const existingUser = UserMother.create({
      ...user,
      principalTitle: new PrincipalTitle(UuidMother.random())
    })

    repository.returnOnFind(existingUser)
    repository.returnOnSearch([existingUser])

    const command = UpdatePrincipalTitleCommandMother.fromAggregate(user)

    await handler.handle(command)

    const expectedEvent = UserUpdatedPrincipalTitleDomainEvent.fromAggregate(user)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
