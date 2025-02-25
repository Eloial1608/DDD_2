import { UpdateAboutAndNameCommandHandler } from '@Core/User/application/UpdateAboutAndName/UpdateAboutAndNameCommandHandler'
import { UpdaterAboutAndName } from '@Core/User/application/UpdateAboutAndName/UpdaterAboutAndName'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock'
import { UserMother } from '../../domain/UserMother'
import { UpdateAboutAndNameUserCommandMother } from './UpdateAboutAndNameCommandMother'
import { UserUpdatedAboutAndNameDomainEvent } from '@Core/User/domain/Events/UserUpdatedAboutAndNameEvent'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'
import { About } from '@Core/User/domain/ValueObjects/About'
import { Name } from '@Core/User/domain/ValueObjects/Name'

let eventBus: EventBusMock
let repository: UserRepositoryMock
let handler: UpdateAboutAndNameCommandHandler
let updater: UpdaterAboutAndName

describe('UpdateAboutAndNameUserCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserRepositoryMock()
    updater = new UpdaterAboutAndName(repository, eventBus)
    handler = new UpdateAboutAndNameCommandHandler(updater)
  })

  test('update not null about and name values', async () => {
    const user = UserMother.random()
    const existignUser = UserMother.create({
      ...user,
      about: new About('about example'),
      name: new Name('example name')
    })
    repository.returnOnFind(existignUser)
    repository.returnOnSearch([existignUser])

    const command = UpdateAboutAndNameUserCommandMother.fromAggregate(user)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(user)
  })

  test('update null about and name values', async () => {
    const user = UserMother.random()
    const existignUser = UserMother.create({
      ...user,
      about: null,
      name: new Name('example name')
    })
    repository.returnOnFind(existignUser)
    repository.returnOnSearch([existignUser])

    const command = UpdateAboutAndNameUserCommandMother.fromAggregate(user)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(user)
  })

  test('fail if a user dosent exists', async () => {
    const user = UserMother.random()
    const command = UpdateAboutAndNameUserCommandMother.fromAggregate(user)

    expect(handler.handle(command)).rejects.toThrow(UserNotFound)
  })

  test('update a new UserUpdatedAboutAndNameDomainEvent', async () => {
    const user = UserMother.random()
    const existignUser = UserMother.create({
      ...user,
      about: new About('about example'),
      name: new Name('example name')
    })

    repository.returnOnFind(existignUser)
    repository.returnOnSearch([existignUser])

    const command = UpdateAboutAndNameUserCommandMother.fromAggregate(user)

    await handler.handle(command)

    const expectedEvent = UserUpdatedAboutAndNameDomainEvent.fromAggregate(user)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
