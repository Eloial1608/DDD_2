import { DeleteSpaceUserTitleCommandHandler } from '@Core/SpaceUserTitle/application/Delete/DeleteSpaceUserTitleCommandHandler'
import { Deleter } from '@Core/SpaceUserTitle/application/Delete/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SpaceUserTitleRepositoryMock } from '../../__mocks__/SpaceUserTitleRepositoryMock'
import { SpaceUserTitleMother } from '../../domain/SpaceUserTitleMother'
import { DeleteSpaceUserTitleCommandMother } from './DeleteSpaceUserTitleCommandMother'
import { SpaceUserTitleDeletedDomainEvent } from '@Core/SpaceUserTitle/domain/Events/SpaceUserTitleDeletedDomainEvent'

let eventBus: EventBusMock
let repository: SpaceUserTitleRepositoryMock
let handler: DeleteSpaceUserTitleCommandHandler
let deleter: Deleter

describe('DeleteSpaceUserTitleCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new SpaceUserTitleRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteSpaceUserTitleCommandHandler(deleter)
  })

  test('Delete a spaceUserTitle', async () => {
    const spaceUserTitle = SpaceUserTitleMother.random()
    const existing = SpaceUserTitleMother.create({ ...spaceUserTitle })

    repository.returnOnFind(existing)

    const command = DeleteSpaceUserTitleCommandMother.fromAggregate(spaceUserTitle)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(spaceUserTitle)
  })

  test('Delete a new SpaceUserTitleDeletedDomainEvent', async () => {
    const spaceUserTitle = SpaceUserTitleMother.random()
    const existing = SpaceUserTitleMother.create({ ...spaceUserTitle })

    repository.returnOnFind(existing)

    const command = DeleteSpaceUserTitleCommandMother.fromAggregate(spaceUserTitle)

    await handler.handle(command)

    const expectedEvent = SpaceUserTitleDeletedDomainEvent.fromAggregate(spaceUserTitle)
    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
