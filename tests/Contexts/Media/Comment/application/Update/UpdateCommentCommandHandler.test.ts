import { UpdateCommentCommandHandler } from '@Media/Comment/application/Update/UpdateCommentCommandHandler'
import { Updater } from '@Media/Comment/application/Update/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { CommentRepositoryMock } from '../../__mocks__/CommentRepositoryMock'
import { CommentMother } from '../../domain/CommentMother'
import { UpdateCommentCommandMother } from './UpdateCommentCommandMother'
import { CommentUpdatedDomainEvent } from '@Media/Comment/domain/Events/CommentUpdatedDomainEvent'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { UserMother } from '@Tests/Contexts/Media/User/domain/UserMother'
import { UserCollectionResponse } from '@Media/User/application/UserCollectionResponse'
import { CommentNotFound } from '@Media/Comment/domain/Errors/CommentNotFound'
import { FindUsersByCriteriaQuery } from '@Media/User/application/FindByCriteria/FindUsersByCriteriaQuery'

let eventBus: EventBusMock
let repository: CommentRepositoryMock
let queryBus: QueryBusMock
let handler: UpdateCommentCommandHandler
let updater: Updater

describe('UpdateCommentCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new CommentRepositoryMock()
    queryBus = new QueryBusMock()
    updater = new Updater(repository, queryBus, eventBus)
    handler = new UpdateCommentCommandHandler(updater)
  })

  test('Update a comment', async () => {
    const user = UserMother.random()

    const comment = CommentMother.forAuthor(user)

    const existingComment = CommentMother.create({
      id: comment.id,
      author: comment.author,
      mediaId: comment.mediaId,
      userId: comment.userId
    })

    repository.returnOnFind(existingComment)

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))

    const command = UpdateCommentCommandMother.fromAggregate(comment)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(comment)
  })

  test('Fail if the user doesnt exists', async () => {
    const user = UserMother.random()

    const comment = CommentMother.forAuthor(user)

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))

    const command = UpdateCommentCommandMother.fromAggregate(comment)

    expect(handler.handle(command)).rejects.toThrow(CommentNotFound)
  })

  test('Create a new CommentUpdatedDomainEvent', async () => {
    const user = UserMother.random()

    const comment = CommentMother.forAuthor(user)

    const existingComment = CommentMother.create({
      id: comment.id,
      author: comment.author,
      mediaId: comment.mediaId,
      userId: comment.userId
    })

    repository.returnOnFind(existingComment)

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))

    const command = UpdateCommentCommandMother.fromAggregate(comment)

    await handler.handle(command)

    const expectedEvent = CommentUpdatedDomainEvent.fromAggregate(comment)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
