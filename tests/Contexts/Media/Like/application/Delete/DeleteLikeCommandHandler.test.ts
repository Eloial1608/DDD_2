import { DeleteLikeCommandHandler } from '@Media/Like/application/Delete/DeleteLikeCommandHandler'
import { Deleter } from '@Media/Like/application/Delete/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { LikeRepositoryMock } from '../../__mocks__/LikeRepositoryMock'
import { LikeMother } from '../../domain/LikeMother'
import { DeleteLikeCommandMother } from './DeleteLikeCommandMother'
import { LikeDeletedDomainEvent } from '@Media/Like/domain/Events/LikeDeletedDomainEvent'

let eventBus: EventBusMock
let repository: LikeRepositoryMock
let handler: DeleteLikeCommandHandler
let deleter: Deleter

describe('DeleteLikeCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new LikeRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteLikeCommandHandler(deleter)
  })

  test('Delete a like', async () => {
    const like = LikeMother.random()

    repository.returnOnFind(like)

    const command = DeleteLikeCommandMother.fromAggregate(like)

    await handler.handle(command)

    repository.assertDeleteHasBeenCalledWith(like)
  })

  test('Create a new LikeDeletedDomainEvent', async () => {
    const like = LikeMother.random()

    repository.returnOnFind(like)

    const command = DeleteLikeCommandMother.fromAggregate(like)

    await handler.handle(command)

    const expectedEvent = LikeDeletedDomainEvent.fromAggregate(like)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
