import { DeleteLevelOnCommunityDeletedHandler } from '@Core/Level/application/DeleteLevelOnCommunityDeleted/DeleteLevelOnCommunityDeletedHandler'
import { Deleter } from '@Core/Level/application/DeleteLevelOnCommunityDeleted/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { LevelRepositoryMock } from '../../__mocks__/LevelRepositoryMock'
import { LevelMother } from '../../domain/LevelMother'
import { LevelDeletedDomainEvent } from '@Core/Level/domain/Events/LevelDeletedDomainEvent'
import { CommunityMother } from '@Tests/Contexts/Core/Community/domain/CommunityMother'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { DeletedAt } from '@Core/Community/domain/ValueObjects/DeletedAt'
import { CommunityDeletedDomainEvent } from '@Core/Community/domain/Events/CommunityDeletedDomainEvent'

let eventBus: EventBusMock
let repository: LevelRepositoryMock
let handler: DeleteLevelOnCommunityDeletedHandler
let deleter: Deleter

describe('DeleteLevelOnCommunityDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new LevelRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteLevelOnCommunityDeletedHandler(deleter)
  })

  test('Delete level', async () => {
    const existignLevel = LevelMother.random()

    const community = CommunityMother.create({
      id: new Id(existignLevel.communityId.valueOf()),
      deletedAt: new DeletedAt(new Date())
    })

    const levelCollection = [existignLevel]

    repository.returnOnSearch(levelCollection)

    const event = CommunityDeletedDomainEvent.fromAggregate(community)

    await handler.on(event)

    const expectedLevel = LevelMother.create({
      ...existignLevel
    })

    repository.assertPersistHasBeenCalledWith(expectedLevel)
  })

  test('update a new LevelDeletedDomainEvent', async () => {
    const existignLevel = LevelMother.random()

    const community = CommunityMother.create({
      id: new Id(existignLevel.communityId.valueOf()),
      deletedAt: new DeletedAt(new Date())
    })

    const levelCollection = [existignLevel]

    repository.returnOnSearch(levelCollection)

    const event = CommunityDeletedDomainEvent.fromAggregate(community)

    await handler.on(event)

    const expectedLevel = LevelMother.create({
      ...existignLevel
    })

    const expectedEvent = LevelDeletedDomainEvent.fromAggregate(expectedLevel)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
