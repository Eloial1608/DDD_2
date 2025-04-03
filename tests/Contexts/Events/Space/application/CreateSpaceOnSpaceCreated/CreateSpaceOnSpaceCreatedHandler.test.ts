import { CreateSpaceOnSpaceCreatedHandler } from '@Events/Space/application/CreateSpaceOnSpaceCreated/CreateSpaceOnSpaceCreatedHandler'
import { Creator } from '@Events/Space/application/CreateSpaceOnSpaceCreated/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SpaceRepositoryMock } from '../../__mocks__/SpaceRepositoryMock'
import { SpaceMother } from '../../domain/SpaceMother'
import { SpaceMother as CoreSpaceMother } from '../../../../Core/Space/domain/SpaceMother'
import { SpaceCreatedDomainEvent as CoreSpaceCreatedDomainEvent } from '@Core/Space/domain/Events/SpaceCreatedDomainEvent'
import { EventsConfiguration } from '@Shared/domain/SharedValueObjects/Space/Configuration/EventsConfiguration'
import { SpaceCreatedDomainEvent } from '@Events/Space/domain/Events/SpaceCreatedDomainEvent'
import { Type } from '@Core/Space/domain/ValueObjects/Type'
import { AllowedTypes } from '@Shared/domain/SharedValueObjects/Space/AllowedTypes'
import { Configuration } from '@Events/Space/domain/ValueObjects/Configuration'

let eventBus: EventBusMock
let repository: SpaceRepositoryMock
let handler: CreateSpaceOnSpaceCreatedHandler
let creator: Creator

describe('CreateSpaceOnSpaceCreatedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new SpaceRepositoryMock()
    creator = new Creator(repository, eventBus)
    handler = new CreateSpaceOnSpaceCreatedHandler(creator)
  })

  test('Create space', async () => {
    const coreSpace = CoreSpaceMother.create({
      type: new Type(AllowedTypes.EVENTS)
    })

    const existingSpace = SpaceMother.create({
      id: coreSpace.id,
      accessibility: coreSpace.accessibility,
      communityId: coreSpace.communityId,
      configuration: new Configuration(coreSpace.configuration.configuration as any)
    })

    const event = CoreSpaceCreatedDomainEvent.fromAggregate(coreSpace)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(existingSpace)
  })

  test('Dont do anything if the space type is not correct', async () => {
    const coreSpace = CoreSpaceMother.create({
      type: new Type(AllowedTypes.FORUM)
    })

    const event = CoreSpaceCreatedDomainEvent.fromAggregate(coreSpace)

    await handler.on(event)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Dont do anything if the space already exists', async () => {
    const coreSpace = CoreSpaceMother.create({
      type: new Type(AllowedTypes.EVENTS)
    })

    const existingSpace = SpaceMother.create({
      id: coreSpace.id,
      accessibility: coreSpace.accessibility,
      type: coreSpace.type,
      communityId: coreSpace.communityId,
      configuration: new EventsConfiguration(coreSpace.configuration.configuration as any)
    })

    repository.returnOnFind(existingSpace)

    const event = CoreSpaceCreatedDomainEvent.fromAggregate(coreSpace)

    await handler.on(event)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new SpaceCreatedDomainEvent', async () => {
    const coreSpace = CoreSpaceMother.create({
      type: new Type(AllowedTypes.EVENTS)
    })

    const existingSpace = SpaceMother.create({
      id: coreSpace.id,
      accessibility: coreSpace.accessibility,
      type: coreSpace.type,
      communityId: coreSpace.communityId,
      configuration: new EventsConfiguration(coreSpace.configuration.configuration as any)
    })

    const event = CoreSpaceCreatedDomainEvent.fromAggregate(coreSpace)

    await handler.on(event)

    const expectedEvent = SpaceCreatedDomainEvent.fromAggregate(existingSpace)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
