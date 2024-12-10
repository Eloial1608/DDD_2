import { UpdateSpaceCommandHandler } from '@Core/Space/application/Update/UpdateSpaceCommandHandler'
import { Updater } from '@Core/Space/application/Update/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SpaceRepositoryMock } from '../../__mocks__/SpaceRepositoryMock'
import { SpaceMother } from '../../domain/SpaceMother'
import { UpdateSpaceCommandMother } from './UpdateSpaceCommandMother'
import { SpaceUpdatedDomainEvent } from '@Core/Space/domain/Events/SpaceUpdatedDomainEvent'
import { SpaceNotFound } from '@Core/Space/domain/Errors/SpaceNotFound'

let eventBus: EventBusMock
let repository: SpaceRepositoryMock
let handler: UpdateSpaceCommandHandler
let updater: Updater

describe('UpdateSpaceCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new SpaceRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateSpaceCommandHandler(updater)
  })

  test('Update a space', async () => {
    const space = SpaceMother.random()
    const existingSpace = SpaceMother.create({
      id: space.id,
      createdBy: space.createdBy,
      communityId: space.communityId
    })

    repository.returnOnFind(existingSpace)

    const command = UpdateSpaceCommandMother.fromAggregate(space)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(space)
  })

  test('Fail if a space doesnt exists', async () => {
    const space = SpaceMother.random()
    const command = UpdateSpaceCommandMother.fromAggregate(space)

    expect(handler.handle(command)).rejects.toThrow(SpaceNotFound)
  })

  test('Update a new SpaceUpdatedDomainEvent', async () => {
    const space = SpaceMother.random()
    const existingSpace = SpaceMother.create({
      id: space.id,
      createdBy: space.createdBy,
      communityId: space.communityId
    })

    repository.returnOnFind(existingSpace)

    const command = UpdateSpaceCommandMother.fromAggregate(space)

    await handler.handle(command)

    const expectedEvent = SpaceUpdatedDomainEvent.fromAggregate(space)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
