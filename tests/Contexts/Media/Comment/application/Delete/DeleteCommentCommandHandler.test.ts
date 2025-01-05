import { DeleteCommentCommandHandler } from '@Media/Comment/application/Delete/DeleteCommentCommandHandler'
import { Deleter } from '@Media/Comment/application/Delete/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { CommentRepositoryMock } from '../../__mocks__/CommentRepositoryMock'
import { CommentMother } from '../../domain/CommentMother'
import { DeleteCommentCommandMother } from './DeleteCommentCommandMother'
import { CommentDeletedDomainEvent } from '@Media/Comment/domain/Events/CommentDeletedDomainEvent'

let eventBus: EventBusMock
let repository: CommentRepositoryMock
let handler: DeleteCommentCommandHandler
let deleter: Deleter

describe('DeleteCommentCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new CommentRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteCommentCommandHandler(deleter)
  })

  test('Delete a comment', async () => {
    const comment = CommentMother.random()

    repository.returnOnFind(comment)

    const command = DeleteCommentCommandMother.fromAggregate(comment)

    await handler.handle(command)

    repository.assertDeleteHasBeenCalledWith(comment)
  })

  test('Create a new CommentDeletedDomainEvent', async () => {
    const comment = CommentMother.random()

    repository.returnOnFind(comment)

    const command = DeleteCommentCommandMother.fromAggregate(comment)

    await handler.handle(command)

    const expectedEvent = CommentDeletedDomainEvent.fromAggregate(comment)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
