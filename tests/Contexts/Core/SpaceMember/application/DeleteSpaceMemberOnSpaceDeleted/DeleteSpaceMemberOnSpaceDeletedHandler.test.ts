import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SpaceMemberRepositoryMock } from '../../__mocks__/SpaceMemberRepositoryMock'
import { DeleteSpaceMemberOnSpaceDeletedHandler } from '@Core/SpaceMember/application/DeleteSpaceMemberOnSpaceDeleted/DeleteSpaceMemberOnSpaceDeletedHandler'
import { Deleter } from '@Core/SpaceMember/application/DeleteSpaceMemberOnSpaceDeleted/Deleter'
import { SpaceMother } from '@Tests/Contexts/Core/Space/domain/SpaceMother'
import { SpaceMemberMother } from '../../domain/SpaceMemberMother'
import { SpaceDeletedDomainEvent } from '@Core/Space/domain/Events/SpaceDeletedDomainEvent'
import { DeletedAt } from '@Core/SpaceMember/domain/ValueObjects/DeletedAt'
import { SpaceMemberDeletedDomainEvent } from '@Core/SpaceMember/domain/Events/SpaceMemberDeletedDomainEvent'

let repository: SpaceMemberRepositoryMock
let eventBus: EventBusMock
let handler: DeleteSpaceMemberOnSpaceDeletedHandler
let deleter: Deleter

describe('DeleteSpaceMemberOnSpaceDeletedHandler should ', () => {
  beforeEach(() => {
    repository = new SpaceMemberRepositoryMock()
    eventBus = new EventBusMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteSpaceMemberOnSpaceDeletedHandler(deleter)
  })

  test('delete every space member', async () => {
    const space = SpaceMother.create({
      deletedAt: new DeletedAt(new Date())
    })

    const spaceMember = SpaceMemberMother.create({
      spaceId: space.id
    })

    const collection = [spaceMember]

    repository.returnOnSearch(collection)

    const event = SpaceDeletedDomainEvent.fromAggregate(space)

    await handler.on(event)

    const expectedSpaceMember = SpaceMemberMother.create({
      ...spaceMember,
      deletedAt: new DeletedAt(new Date())
    })

    repository.assertPersistHasBeenCalledWith(expectedSpaceMember)
  })

  test('create a new SpaceMemberDeletedDomainEvent', async () => {
    const space = SpaceMother.create({
      deletedAt: new DeletedAt(new Date())
    })

    const spaceMember = SpaceMemberMother.create({
      spaceId: space.id
    })

    const collection = [spaceMember]

    repository.returnOnSearch(collection)

    const event = SpaceDeletedDomainEvent.fromAggregate(space)

    await handler.on(event)

    const expectedSpaceMember = SpaceMemberMother.create({
      ...spaceMember,
      deletedAt: new DeletedAt(new Date())
    })

    const expectedEvent = SpaceMemberDeletedDomainEvent.fromAggregate(expectedSpaceMember)

    eventBus.assertLastPublishedEventIs(expectedEvent)
  })
})
