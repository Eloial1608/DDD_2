import { CreateCommunityOnCommunityCreatedHandler } from '@Projects/Community/application/CreateCommunityOnCommunityCreated/CreateCommunityOnCommunityCreatedHandler'
import { Creator } from '@Projects/Community/application/CreateCommunityOnCommunityCreated/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { CommunityRepositoryMock } from '../../__mocks__/CommunityRepositoryMock'
import { CommunityMother } from '../../domain/CommunityMother'
import { CommunityMother as CoreCommunityMother } from '@Tests/Contexts/Core/Community/domain/CommunityMother'
import { CommunityCreatedDomainEvent as CoreCommunityCreatedDomainEvent } from '@Core/Community/domain/Events/CommunityCreatedDomainEvent'
import { CommunityCreatedDomainEvent } from '@Projects/Community/domain/Events/CommunityCreatedDomainEvent'

let eventBus: EventBusMock
let repository: CommunityRepositoryMock
let handler: CreateCommunityOnCommunityCreatedHandler
let creator: Creator

describe('CreateCommunityOnCommunityCreatedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new CommunityRepositoryMock()
    creator = new Creator(repository, eventBus)
    handler = new CreateCommunityOnCommunityCreatedHandler(creator)
  })

  test('Create community', async () => {
    const coreCommunity = CoreCommunityMother.random()

    const existingCommunity = CommunityMother.create({ id: coreCommunity.id })

    const event = CoreCommunityCreatedDomainEvent.fromAggregate(coreCommunity)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(existingCommunity)
  })

  test('Dont do anything if the community already exists', async () => {
    const coreCommunity = CoreCommunityMother.random()

    const existingCommunity = CommunityMother.create({ id: coreCommunity.id })

    repository.returnOnFind(existingCommunity)

    const event = CoreCommunityCreatedDomainEvent.fromAggregate(coreCommunity)

    await handler.on(event)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new CommunityCreatedDomainEvent', async () => {
    const coreCommunity = CoreCommunityMother.random()

    const existingCommunity = CommunityMother.create({ id: coreCommunity.id })

    const event = CoreCommunityCreatedDomainEvent.fromAggregate(coreCommunity)

    await handler.on(event)

    const expectedEvent = CommunityCreatedDomainEvent.fromAggregate(existingCommunity)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
