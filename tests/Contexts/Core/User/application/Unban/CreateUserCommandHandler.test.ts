import { UnbanUserCommandHandler } from '@Core/User/application/Unban/UnbanUserCommandHandler'
import { Updater } from '@Core/User/application/Unban/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UserMother } from '../../domain/UserMother'
import { UnbanUserCommandMother } from './UnbanUserCommandMother'
import { IsBanned } from '@Core/User/domain/ValueObjects/IsBanned'
import { UpdatedAt } from '@Core/User/domain/ValueObjects/UpdatedAt'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'
import { UserUnbannedDomainEvent } from '@Core/User/domain/Events/UserUnbannedDomainEvent'

let eventBus: EventBusMock
let repository: UserRepositoryMock
let handler: UnbanUserCommandHandler
let updater: Updater

describe('UnbanUserCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UnbanUserCommandHandler(updater)
  })

  test('Unban a user', async () => {
    const user = UserMother.create({
      isBanned: new IsBanned(true)
    })

    const expectedUser = UserMother.create({
      ...user,
      isBanned: new IsBanned(false),
      updatedAt: new UpdatedAt(new Date())
    })

    repository.returnOnFind(user)

    const command = UnbanUserCommandMother.fromAggregate(user)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(expectedUser)
  })

  test('Fail if the user doesnt exists', async () => {
    const user = UserMother.create({
      isBanned: new IsBanned(true)
    })

    const command = UnbanUserCommandMother.fromAggregate(user)

    expect(handler.handle(command)).rejects.toThrow(UserNotFound)
  })

  test('Create a new UserUnbanneddDomainEvent', async () => {
    const user = UserMother.create({
      isBanned: new IsBanned(true)
    })

    const expectedUser = UserMother.create({
      ...user,
      isBanned: new IsBanned(false),
      updatedAt: new UpdatedAt(new Date())
    })

    repository.returnOnFind(user)

    const command = UnbanUserCommandMother.fromAggregate(user)

    await handler.handle(command)

    const expectedEvent = UserUnbannedDomainEvent.fromAggregate(expectedUser)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
