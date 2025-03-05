import { DeleteContentCommandHandler } from '@Media/Content/application/Delete/DeleteContentCommandHandler'
import { Deleter } from '@Media/Content/application/Delete/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { ContentRepositoryMock } from '../../__mocks__/ContentRepositoryMock'
import { ContentMother } from '../../domain/ContentMother'
import { DeleteContentCommandMother } from './DeleteContentCommandMother'
import { ContentDeletedDomainEvent } from '@Media/Content/domain/Events/ContentDeletedDomainEvent'

let eventBus: EventBusMock
let repository: ContentRepositoryMock
let handler: DeleteContentCommandHandler
let deleter: Deleter

describe('DeleteContentCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new ContentRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteContentCommandHandler(deleter)
  })

  test('Delete a content', async () => {
    const content = ContentMother.random()

    repository.returnOnFind(content)

    const command = DeleteContentCommandMother.fromAggregate(content)

    await handler.handle(command)

    repository.assertDeleteHasBeenCalledWith(content)
  })

  test('Create a new ContentDeletedDomainEvent', async () => {
    const content = ContentMother.random()

    repository.returnOnFind(content)

    const command = DeleteContentCommandMother.fromAggregate(content)

    await handler.handle(command)

    const expectedEvent = ContentDeletedDomainEvent.fromAggregate(content)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
