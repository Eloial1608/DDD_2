import { CreateSpaceOnSpaceCreatedHandler } from '@Metrics/Space/application/CreateSpaceOnSpaceCreated/CreateSpaceOnSpaceCreatedHandler'
import { Creator } from '@Metrics/Space/application/CreateSpaceOnSpaceCreated/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SpaceRepositoryMock } from '../../__mocks__/SpaceRepositoryMock'
import { SpaceMother } from '../../domain/SpaceMother'
import { SpaceMother as CoreSpaceMother } from '../../../../Core/Space/domain/SpaceMother'
import { SpaceCreatedDomainEvent as CoreSpaceCreatedDomainEvent } from '@Core/Space/domain/Events/SpaceCreatedDomainEvent'
import { SpaceCreatedDomainEvent } from '@Metrics/Space/domain/Events/SpaceCreatedDomainEvent'


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
    const coreSpace = CoreSpaceMother.random()

    const existingSpace = SpaceMother.create({
      id: coreSpace.id,
      communityId: coreSpace.communityId
    })

    const event = CoreSpaceCreatedDomainEvent.fromAggregate(coreSpace)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(existingSpace)
  })

  test('Dont do anything if the space already exists', async () => {
    const coreSpace = CoreSpaceMother.random()

    const existingSpace = SpaceMother.create({
      id: coreSpace.id,
      type: coreSpace.type,
      communityId: coreSpace.communityId,    })

    repository.returnOnFind(existingSpace)

    const event = CoreSpaceCreatedDomainEvent.fromAggregate(coreSpace)

    await handler.on(event)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new SpaceCreatedDomainEvent', async () => {
    const coreSpace = CoreSpaceMother.random()

    const existingSpace = SpaceMother.create({
      id: coreSpace.id,
      type: coreSpace.type,
      communityId: coreSpace.communityId,
    })

    const event = CoreSpaceCreatedDomainEvent.fromAggregate(coreSpace)

    await handler.on(event)

    const expectedEvent = SpaceCreatedDomainEvent.fromAggregate(existingSpace)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
