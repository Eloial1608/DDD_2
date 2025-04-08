import { UpdateSpaceOnSpaceUpdatedHandler } from '@Chat/Space/application/UpdateSpaceOnSpaceUpdated/UpdateSpaceOnSpaceUpdatedHandler'
import { Updater } from '@Chat/Space/application/UpdateSpaceOnSpaceUpdated/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SpaceRepositoryMock } from '../../__mocks__/SpaceRepositoryMock'
import { SpaceMother } from '../../domain/SpaceMother'
import { SpaceMother as CoreSpaceMother } from '@Tests/Contexts/Core/Space/domain/SpaceMother'
import { SpaceUpdatedDomainEvent as CoreSpaceUpdatedDomainEvent } from '@Core/Space/domain/Events/SpaceUpdatedDomainEvent'
import { ChatConfiguration } from '@Shared/domain/SharedValueObjects/Space/Configuration/ChatConfiguration'
import { Type } from '@Core/Space/domain/ValueObjects/Type'
import { AllowedTypes } from '@Shared/domain/SharedValueObjects/Space/AllowedTypes'
import { Configuration } from '@Chat/Space/domain/ValueObjects/Configuration'
import { UpdatedAt } from '@Core/Space/domain/ValueObjects/UpdatedAt'
import { SpaceUpdatedDomainEvent } from '@Chat/Space/domain/Events/SpaceUpdatedDomainEvent'

let eventBus: EventBusMock
let repository: SpaceRepositoryMock
let handler: UpdateSpaceOnSpaceUpdatedHandler
let updater: Updater

describe('UpdateSpaceOnSpaceUpdatedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new SpaceRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateSpaceOnSpaceUpdatedHandler(updater)
  })

  test('Create space', async () => {
    const coreSpace = CoreSpaceMother.create({
      updatedAt: new UpdatedAt(new Date())
    })

    const existingSpace = SpaceMother.create({
      id: coreSpace.id,
      accessibility: coreSpace.accessibility,
      communityId: coreSpace.communityId,
      configuration: new Configuration(coreSpace.configuration.configuration as any)
    })

    repository.returnOnFind(existingSpace)

    const event = CoreSpaceUpdatedDomainEvent.fromAggregate(coreSpace)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(existingSpace)
  })

  test('Dont do anything if the space type is not correct', async () => {
    const coreSpace = CoreSpaceMother.create({
      type: new Type(AllowedTypes.FORUM),
      updatedAt: new UpdatedAt(new Date())
    })

    const event = CoreSpaceUpdatedDomainEvent.fromAggregate(coreSpace)

    await handler.on(event)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Dont do anything if the space doesnt exists exists', async () => {
    const coreSpace = CoreSpaceMother.create({
      updatedAt: new UpdatedAt(new Date())
    })

    const event = CoreSpaceUpdatedDomainEvent.fromAggregate(coreSpace)

    await handler.on(event)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new SpaceUpdatedDomainEvent', async () => {
    const coreSpace = CoreSpaceMother.create({
      updatedAt: new UpdatedAt(new Date())
    })

    const existingSpace = SpaceMother.create({
      id: coreSpace.id,
      accessibility: coreSpace.accessibility,
      type: coreSpace.type,
      communityId: coreSpace.communityId,
      configuration: new ChatConfiguration(coreSpace.configuration.configuration as any)
    })

    repository.returnOnFind(existingSpace)

    const event = CoreSpaceUpdatedDomainEvent.fromAggregate(coreSpace)

    await handler.on(event)

    const expectedEvent = SpaceUpdatedDomainEvent.fromAggregate(existingSpace)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
