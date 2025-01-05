import { DeleteMediaCommandHandler } from '@Media/Media/application/Delete/DeleteMediaCommandHandler'
import { Deleter } from '@Media/Media/application/Delete/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { MediaRepositoryMock } from '../../__mocks__/MediaRepositoryMock'
import { MediaMother } from '../../domain/MediaMother'
import { DeleteMediaCommandMother } from './DeleteMediaCommandMother'
import { MediaDeletedDomainEvent } from '@Media/Media/domain/Events/MediaDeletedDomainEvent'
import { DeletedAt } from '@Media/Media/domain/ValueObjects/DeletedAt'

let eventBus: EventBusMock
let repository: MediaRepositoryMock
let handler: DeleteMediaCommandHandler
let deleter: Deleter

describe('DeleteMediaCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new MediaRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteMediaCommandHandler(deleter)
  })

  test('Delete a media', async () => {
    const media = MediaMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = MediaMother.create({ ...media, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteMediaCommandMother.fromAggregate(media)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(media)
  })

  test('Create a new MediaDeletedDomainEvent', async () => {
    const media = MediaMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = MediaMother.create({ ...media, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteMediaCommandMother.fromAggregate(media)

    await handler.handle(command)

    const expectedEvent = MediaDeletedDomainEvent.fromAggregate(media)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
