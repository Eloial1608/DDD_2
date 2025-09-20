import { Deleter } from '@Core/UserLevel/application/DeleteUserLevelOnLevelDeleted/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { UserLevelRepositoryMock } from '../../__mocks__/UserLevelRepositoryMock'
import { UserLevelMother } from '../../domain/UserLevelMother'
import { UserLevelDeletedDomainEvent } from '@Core/UserLevel/domain/Events/UserLevelDeletedDomainEvent'
import { Id } from '@Core/Level/domain/ValueObjects/Id'
import { DeleteUserLevelOnLevelDeletedHandler } from '@Core/UserLevel/application/DeleteUserLevelOnLevelDeleted/DeleteUserLevelOnLevelDeletedHandler'
import { LevelMother } from '@Tests/Contexts/Core/Level/domain/LevelMother'
import { LevelDeletedDomainEvent } from '@Core/Level/domain/Events/LevelDeletedDomainEvent'

let eventBus: EventBusMock
let repository: UserLevelRepositoryMock
let handler: DeleteUserLevelOnLevelDeletedHandler
let deleter: Deleter

describe('Delete UserLevelOnLevelDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new UserLevelRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteUserLevelOnLevelDeletedHandler(deleter)
  })

  test('Delete userlevel', async () => {
    const existignUserLevel = UserLevelMother.random()

    const level = LevelMother.create({
      id: new Id(existignUserLevel.levelId.valueOf()),
    })

    const userlevelCollection = [existignUserLevel]

    repository.returnOnSearch(userlevelCollection)

    const event = LevelDeletedDomainEvent.fromAggregate(level)

    await handler.on(event)

    const expectedUserLevel = UserLevelMother.create({
      ...existignUserLevel
    })

    repository.assertPersistHasBeenCalledWith(expectedUserLevel)
  })

  test('update a new UserLevelDeletedDomainEvent', async () => {
    const existignUserLevel = UserLevelMother.random()

    const level = LevelMother.create({
      id: new Id(existignUserLevel.levelId.valueOf()),
    })

    const userlevelCollection = [existignUserLevel]

    repository.returnOnSearch(userlevelCollection)

    const event = LevelDeletedDomainEvent.fromAggregate(level)

    await handler.on(event)

    const expectedUserLevel = UserLevelMother.create({
      ...existignUserLevel
    })

    const expectedEvent = UserLevelDeletedDomainEvent.fromAggregate(expectedUserLevel)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
