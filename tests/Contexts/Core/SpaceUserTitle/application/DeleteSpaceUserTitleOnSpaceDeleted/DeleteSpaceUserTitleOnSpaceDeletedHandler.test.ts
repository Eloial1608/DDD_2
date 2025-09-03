import { Deleter } from '@Core/SpaceUserTitle/application/DeleteSpaceUserTitleOnSpaceDeleted/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SpaceUserTitleRepositoryMock } from '../../__mocks__/SpaceUserTitleRepositoryMock'
import { SpaceUserTitleMother } from '../../domain/SpaceUserTitleMother'
import { Id } from '@Core/Space/domain/ValueObjects/Id'
import { DeletedAt } from '@Core/Space/domain/ValueObjects/DeletedAt'
import { SpaceUserTitleDeletedDomainEvent } from '@Core/SpaceUserTitle/domain/Events/SpaceUserTitleDeletedDomainEvent'
import { DeleteSpaceUserTitleOnSpaceDeletedHandler } from '@Core/SpaceUserTitle/application/DeleteSpaceUserTitleOnSpaceDeleted/DeleteSpaceUserTitleOnSpaceDeletedHandler'
import { SpaceMother } from '@Tests/Contexts/Core/Space/domain/SpaceMother'
import { SpaceDeletedDomainEvent } from '@Core/Space/domain/Events/SpaceDeletedDomainEvent'

let eventBus: EventBusMock
let repository: SpaceUserTitleRepositoryMock
let handler: DeleteSpaceUserTitleOnSpaceDeletedHandler
let deleter: Deleter

describe('DeleteSpaceUserTitleOnSpaceDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new SpaceUserTitleRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteSpaceUserTitleOnSpaceDeletedHandler(deleter)
  })

  test('Delete spaceUserTitle', async () => {
    const existingSpaceUserTitle = SpaceUserTitleMother.random()

    const space = SpaceMother.create({
      id: new Id(existingSpaceUserTitle.spaceId.valueOf()),
      deletedAt: new DeletedAt(new Date())
    })

    const spaceCollection = [existingSpaceUserTitle]

    repository.returnOnSearch(spaceCollection)

    const event = SpaceDeletedDomainEvent.fromAggregate(space)

    await handler.on(event)

    const expectedSpace = SpaceUserTitleMother.create({
      ...existingSpaceUserTitle,
    })

    repository.assertPersistHasBeenCalledWith(expectedSpace)
  })

  test('update a new SpaceUserTitleDeletedDomainEvent', async () => {
    const existingSpaceUserTitle = SpaceUserTitleMother.random()

    const space = SpaceMother.create({
      id: new Id(existingSpaceUserTitle.communityId.valueOf()),
      deletedAt: new DeletedAt(new Date())
    })

    const spaceCollection = [existingSpaceUserTitle]

    repository.returnOnSearch(spaceCollection)

    const event = SpaceDeletedDomainEvent.fromAggregate(space)

    await handler.on(event)

    const expectedSpace = SpaceUserTitleMother.create({
      ...existingSpaceUserTitle,
    })

    const expectedEvent = SpaceUserTitleDeletedDomainEvent.fromAggregate(expectedSpace)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
