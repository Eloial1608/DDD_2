import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { CommentRepositoryMock } from '../../__mocks__/CommentRepositoryMock'
import { CreateCommentCommandHandler } from '@Posts/Comment/application/Create/CreateCommentCommandHandler'
import { Creator } from '@Posts/Comment/application/Create/Creator'
import { UserMother } from '@Tests/Contexts/Posts/User/domain/UserMother'
import { CommentMother } from '../../domain/CommentMother'
import { FindUsersByCriteriaQuery } from '@Posts/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Posts/User/application/UserCollectionResponse'
import { CreateCommentCommandMother } from './CreateCommentCommandMother'
import { CommentCreatedDomainEvent } from '@Posts/Comment/domain/Events/CommentCreatedDomainEvent'

let eventBus: EventBusMock
let repository: CommentRepositoryMock
let queryBus: QueryBusMock
let handler: CreateCommentCommandHandler
let creator: Creator

describe('CreatePostCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new CommentRepositoryMock()
    queryBus = new QueryBusMock()
    creator = new Creator(repository, eventBus, queryBus)
    handler = new CreateCommentCommandHandler(creator)
  })

  test('Create a new comment', async () => {
    const user = UserMother.random()

    const comment = CommentMother.forAuthor(user)

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))

    const command = CreateCommentCommandMother.fromAggregate(comment)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(comment)
  })

  test('Fail if a comment with the same id already exists', async () => {
    const user = UserMother.random()

    const comment = CommentMother.forAuthor(user)

    const existingComment = CommentMother.create({ id: comment.id })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))

    const command = CreateCommentCommandMother.fromAggregate(comment)

    repository.returnOnFind(existingComment)

    await handler.handle(command)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new CommentCreatedDomainEvent', async () => {
    const user = UserMother.random()

    const comment = CommentMother.forAuthor(user)

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))

    const command = CreateCommentCommandMother.fromAggregate(comment)

    await handler.handle(command)

    const expectedEvent = CommentCreatedDomainEvent.fromAggregate(comment)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
