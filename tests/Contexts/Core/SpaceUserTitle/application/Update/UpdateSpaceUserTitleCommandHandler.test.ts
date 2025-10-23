import { UpdateSpaceUserTitleCommandHandler } from '@Core/SpaceUserTitle/application/Update/UpdateSpaceUserTitleCommandHandler'
import { Updater } from '@Core/SpaceUserTitle/application/Update/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SpaceUserTitleRepositoryMock } from '../../__mocks__/SpaceUserTitleRepositoryMock'
import { SpaceUserTitleMother } from '../../domain/SpaceUserTitleMother'
import { UpdateSpaceUserTitleCommandMother } from './UpdateSpaceUserTitleCommandMother'
import { SpaceUserTitleUpdatedDomainEvent } from '@Core/SpaceUserTitle/domain/Events/SpaceUserTitleUpdatedDomainEvent'
import { SpaceUserTitleNotFound } from '@Core/SpaceUserTitle/domain/Errors/SpaceUserTitleNotFound'

let eventBus: EventBusMock
let repository: SpaceUserTitleRepositoryMock
let handler: UpdateSpaceUserTitleCommandHandler
let updater: Updater

describe('UpdateSpaceUserTitleCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new SpaceUserTitleRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateSpaceUserTitleCommandHandler(updater)
  })

  test('Update a spaceUserTitle', async () => {
    const spaceUserTitle = SpaceUserTitleMother.random()
    const existing = SpaceUserTitleMother.create(spaceUserTitle)

    repository.returnOnFind(existing)

    const command = UpdateSpaceUserTitleCommandMother.fromAggregate(spaceUserTitle)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(spaceUserTitle)
  })

  test('Fail if a spaceUserTitle doesnt exists', async () => {
    const spaceUserTitle = SpaceUserTitleMother.random()
    const command = UpdateSpaceUserTitleCommandMother.fromAggregate(spaceUserTitle)

    expect(handler.handle(command)).rejects.toThrow(SpaceUserTitleNotFound)
  })

  test('Update a new SpaceUserTitleUpdatedDomainEvent', async () => {
    const spaceUserTitle = SpaceUserTitleMother.random()
    const existing = SpaceUserTitleMother.create(spaceUserTitle)

    repository.returnOnFind(existing)

    const command = UpdateSpaceUserTitleCommandMother.fromAggregate(spaceUserTitle)

    await handler.handle(command)

    const expectedEvent = SpaceUserTitleUpdatedDomainEvent.fromAggregate(spaceUserTitle)
    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
