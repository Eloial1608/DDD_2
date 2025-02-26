import { UpdateUserRegisterDataCommandHandler } from '@Core/User/application/UpdateUserRegisterData/UpdateUserRegisterDataCommandHandler'
import { UpdaterUserRegisterData } from '@Core/User/application/UpdateUserRegisterData/UpdaterUserRegisterData'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UserMother } from '../../domain/UserMother'
import { UpdateUserRegisterDataCommandMother } from './UpdateUserRegisterDataCommandMother'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'
import { RegisterData } from '@Core/User/domain/ValueObjects/RegisterData'
import { UserRegisterDataUpdatedDomainEvent } from '@Core/User/domain/Events/UserRegisterDataUpdatedEvent'
import { HasCompletedRegister } from '@Core/User/domain/ValueObjects/HasCompletedRegister'

let eventBus: EventBusMock
let repository: UserRepositoryMock
let handler: UpdateUserRegisterDataCommandHandler
let updater: UpdaterUserRegisterData

describe('UpdateUserRegisterDataUserCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserRepositoryMock()
    updater = new UpdaterUserRegisterData(repository, eventBus)
    handler = new UpdateUserRegisterDataCommandHandler(updater)
  })

  test('update the user', async () => {
    const user = UserMother.create({
      registerData: new RegisterData({ registerData: true }),
      hasCompletedRegister: new HasCompletedRegister(true)
    })
    const existignUser = UserMother.create({
      ...user,
      registerData: null
    })
    repository.returnOnFind(existignUser)

    const command = UpdateUserRegisterDataCommandMother.fromAggregate(user)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(user)
  })

  test('fail if a user dosent exists', async () => {
    const user = UserMother.create({
      registerData: new RegisterData({ registerData: true }),
      hasCompletedRegister: new HasCompletedRegister(true)
    })
    const command = UpdateUserRegisterDataCommandMother.fromAggregate(user)

    expect(handler.handle(command)).rejects.toThrow(UserNotFound)
  })

  test('create a new UserRegisterDataUpdatedDomainEvent', async () => {
    const user = UserMother.create({
      registerData: new RegisterData({ registerData: true }),
      hasCompletedRegister: new HasCompletedRegister(true)
    })
    const existignUser = UserMother.create({
      ...user,
      registerData: null
    })

    repository.returnOnFind(existignUser)

    const command = UpdateUserRegisterDataCommandMother.fromAggregate(user)

    await handler.handle(command)

    const expectedEvent = UserRegisterDataUpdatedDomainEvent.fromAggregate(user)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
