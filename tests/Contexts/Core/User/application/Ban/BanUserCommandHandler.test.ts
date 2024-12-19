import { BanUserCommandHandler } from '@Core/User/application/Ban/BanUserCommandHandler'
import { Updater } from '@Core/User/application/Ban/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UserMother } from '../../domain/UserMother'
import { BanUserCommandMother } from './BanUserCommandMother'
import { IsBanned } from '@Core/User/domain/ValueObjects/IsBanned'
import { UpdatedAt } from '@Core/User/domain/ValueObjects/UpdatedAt'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'
import { UserBannedDomainEvent } from '@Core/User/domain/Events/UserBannedDoaminEvent'

let eventBus: EventBusMock
let repository: UserRepositoryMock
let handler: BanUserCommandHandler
let updater: Updater

describe('BanUserCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new BanUserCommandHandler(updater)
  })

  test('Ban a user', async () => {
    const user = UserMother.create({
      isBanned: new IsBanned(false)
    })

    const expectedUser = UserMother.create({
      ...user,
      isBanned: new IsBanned(true),
      updatedAt: new UpdatedAt(new Date())
    })

    repository.returnOnFind(user)

    const command = BanUserCommandMother.fromAggregate(user)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(expectedUser)
  })

  test('Fail if the user doesnt exists', async () => {
    const user = UserMother.create({
      isBanned: new IsBanned(false)
    })

    const command = BanUserCommandMother.fromAggregate(user)

    expect(handler.handle(command)).rejects.toThrow(UserNotFound)
  })

  test('Create a new UserBanneddDomainEvent', async () => {
    const user = UserMother.create({
      isBanned: new IsBanned(false)
    })

    const expectedUser = UserMother.create({
      ...user,
      isBanned: new IsBanned(true),
      updatedAt: new UpdatedAt(new Date())
    })

    repository.returnOnFind(user)

    const command = BanUserCommandMother.fromAggregate(user)

    await handler.handle(command)

    const expectedEvent = UserBannedDomainEvent.fromAggregate(expectedUser)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
