import { UpdateCommentCommandHandler } from '@Course/Comment/application/Update/UpdateCommentCommandHandler'
import { Updater } from '@Course/Comment/application/Update/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { CommentRepositoryMock } from '../../__mocks__/CommentRepositoryMock'
import { CommentMother } from '../../domain/CommentMother'
import { UpdateCommentCommandMother } from './UpdateCommentCommandMother'
import { CommentUpdatedDomainEvent } from '@Course/Comment/domain/Events/CommentUpdatedDomainEvent'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { UserMother } from '@Tests/Contexts/Course/User/domain/UserMother'
import { UserCollectionResponse } from '@Course/User/application/UserCollectionResponse'
import { CommentNotFound } from '@Course/Comment/domain/Errors/CommentNotFound'
import { FindUsersByCriteriaQuery } from '@Course/User/application/FindByCriteria/FindUsersByCriteriaQuery'

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
      courseId: comment.courseId,
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
      courseId: comment.courseId,
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
