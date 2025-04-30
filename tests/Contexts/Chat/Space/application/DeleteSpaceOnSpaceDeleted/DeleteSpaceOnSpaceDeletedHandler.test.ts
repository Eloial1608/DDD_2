import { DeleteSpaceOnSpaceDeletedHandler } from '@Chat/Space/application/DeleteSpaceOnSpaceDeleted/DeleteSpaceOnSpaceDeletedHandler'
import { Deleter } from '@Chat/Space/application/DeleteSpaceOnSpaceDeleted/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SpaceRepositoryMock } from '../../__mocks__/SpaceRepositoryMock'
import { SpaceMother } from '../../domain/SpaceMother'
import { SpaceMother as CoreSpaceMother } from '@Tests/Contexts/Core/Space/domain/SpaceMother'
import { SpaceDeletedDomainEvent as CoreSpaceDeletedDomainEvent } from '@Core/Space/domain/Events/SpaceDeletedDomainEvent'
import { ChatConfiguration } from '@Shared/domain/SharedValueObjects/Space/Configuration/ChatConfiguration'
import { Type } from '@Core/Space/domain/ValueObjects/Type'
import { AllowedTypes } from '@Shared/domain/SharedValueObjects/Space/AllowedTypes'
import { Configuration } from '@Chat/Space/domain/ValueObjects/Configuration'
import { DeletedAt } from '@Core/Space/domain/ValueObjects/DeletedAt'
import { SpaceDeletedDomainEvent } from '@Chat/Space/domain/Events/SpaceDeletedDomainEvent'

let eventBus: EventBusMock
let repository: SpaceRepositoryMock
let handler: DeleteSpaceOnSpaceDeletedHandler
let deleter: Deleter

describe('DeleteSpaceOnSpaceDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new SpaceRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteSpaceOnSpaceDeletedHandler(deleter)
  })

  test('Create space', async () => {
    const coreSpace = CoreSpaceMother.create({
      deletedAt: new DeletedAt(new Date())
    })

    const existingSpace = SpaceMother.create({
      id: coreSpace.id,
      accessibility: coreSpace.accessibility,
      communityId: coreSpace.communityId,
      configuration: new Configuration(coreSpace.configuration.configuration as any)
    })

    repository.returnOnFind(existingSpace)

    const event = CoreSpaceDeletedDomainEvent.fromAggregate(coreSpace)

    await handler.on(event)

    repository.assertDeleteHasBeenCalledWith(existingSpace)
  })

  test('Dont do anything if the space type is not correct', async () => {
    const coreSpace = CoreSpaceMother.create({
      type: new Type(AllowedTypes.FORUM),
      deletedAt: new DeletedAt(new Date())
    })

    const event = CoreSpaceDeletedDomainEvent.fromAggregate(coreSpace)

    await handler.on(event)

    repository.assertDeleteHasNotBeenCalled()
  })

  test('Dont do anything if the space doesnt exists exists', async () => {
    const coreSpace = CoreSpaceMother.create({
      deletedAt: new DeletedAt(new Date())
    })

    const event = CoreSpaceDeletedDomainEvent.fromAggregate(coreSpace)

    await handler.on(event)

    repository.assertDeleteHasNotBeenCalled()
  })

  test('Create a new SpaceDeletedDomainEvent', async () => {
    const coreSpace = CoreSpaceMother.create({
      deletedAt: new DeletedAt(new Date())
    })

    const existingSpace = SpaceMother.create({
      id: coreSpace.id,
      accessibility: coreSpace.accessibility,
      type: coreSpace.type,
      communityId: coreSpace.communityId,
      configuration: new ChatConfiguration(coreSpace.configuration.configuration as any)
    })

    repository.returnOnFind(existingSpace)

    const event = CoreSpaceDeletedDomainEvent.fromAggregate(coreSpace)

    await handler.on(event)

    const expectedEvent = SpaceDeletedDomainEvent.fromAggregate(existingSpace)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
