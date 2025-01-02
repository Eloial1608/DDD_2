import { DeletePostCommandHandler } from '@Posts/Post/application/Delete/DeletePostCommandHandler'
import { Deleter } from '@Posts/Post/application/Delete/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { PostRepositoryMock } from '../../__mocks__/PostRepositoryMock'
import { PostMother } from '../../domain/PostMother'
import { DeletePostCommandMother } from './DeletePostCommandMother'
import { PostDeletedDomainEvent } from '@Posts/Post/domain/Events/PostDeletedDomainEvent'
import { DeletedAt } from '@Posts/Post/domain/ValueObjects/DeletedAt'

let eventBus: EventBusMock
let repository: PostRepositoryMock
let handler: DeletePostCommandHandler
let deleter: Deleter

describe('DeletePostCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new PostRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeletePostCommandHandler(deleter)
  })

  test('Delete a post', async () => {
    const post = PostMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = PostMother.create({ ...post, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeletePostCommandMother.fromAggregate(post)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(post)
  })

  test('Create a new PostDeletedDomainEvent', async () => {
    const post = PostMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = PostMother.create({ ...post, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeletePostCommandMother.fromAggregate(post)

    await handler.handle(command)

    const expectedEvent = PostDeletedDomainEvent.fromAggregate(post)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
