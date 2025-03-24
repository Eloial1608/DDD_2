import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { CommentRepositoryMock } from '../../__mocks__/CommentRepositoryMock'
import { CreateCommentCommandHandler } from '@Course/Comment/application/Create/CreateCommentCommandHandler'
import { Creator } from '@Course/Comment/application/Create/Creator'
import { UserMother } from '@Tests/Contexts/Course/User/domain/UserMother'
import { CommentMother } from '../../domain/CommentMother'
import { FindUsersByCriteriaQuery } from '@Course/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Course/User/application/UserCollectionResponse'
import { CreateCommentCommandMother } from './CreateCommentCommandMother'
import { CommentCreatedDomainEvent } from '@Course/Comment/domain/Events/CommentCreatedDomainEvent'
import { CourseMother } from '@Tests/Contexts/Course/Course/domain/CourseMother'
import { SpaceMother } from '@Tests/Contexts/Course/Space/domain/SpaceMother'
import { CourseConfiguration } from '@Shared/domain/SharedValueObjects/Space/Configuration/CourseConfiguration'
import { CourseResponse } from '@Course/Course/application/CourseResponse'
import { SpaceResponse } from '@Course/Space/application/SpaceResponse'
import { FindCourseByIdQuery } from '@Course/Course/application/FindById/FindCourseByIdQuery'
import { FindSpaceByIdQuery } from '@Course/Space/application/FindById/FindSpaceByIdQuery'

let eventBus: EventBusMock
let repository: CommentRepositoryMock
let queryBus: QueryBusMock
let handler: CreateCommentCommandHandler
let creator: Creator

describe('CreateCourseCommandHandler should ', () => {
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

    const course = CourseMother.random()

    const space = SpaceMother.create({ id: course.spaceId, configuration: new CourseConfiguration({ allowsLikes: true }) })

    queryBus.returnOnQuery(new FindCourseByIdQuery(course.id.valueOf()), new CourseResponse(course))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))
    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))

    const command = CreateCommentCommandMother.fromAggregate(comment)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(comment)
  })

  test('Fail if a comment with the same id already exists', async () => {
    const user = UserMother.random()

    const comment = CommentMother.forAuthor(user)

    const existingComment = CommentMother.create({ id: comment.id })

    const course = CourseMother.random()

    const space = SpaceMother.create({ id: course.spaceId, configuration: new CourseConfiguration({ allowsLikes: true }) })

    queryBus.returnOnQuery(new FindCourseByIdQuery(course.id.valueOf()), new CourseResponse(course))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))
    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))

    const command = CreateCommentCommandMother.fromAggregate(comment)

    repository.returnOnFind(existingComment)

    await handler.handle(command)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new CommentCreatedDomainEvent', async () => {
    const user = UserMother.random()

    const comment = CommentMother.forAuthor(user)

    const course = CourseMother.random()

    const space = SpaceMother.create({ id: course.spaceId, configuration: new CourseConfiguration({ allowsLikes: true }) })

    queryBus.returnOnQuery(new FindCourseByIdQuery(course.id.valueOf()), new CourseResponse(course))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))
    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))

    const command = CreateCommentCommandMother.fromAggregate(comment)

    await handler.handle(command)

    const expectedEvent = CommentCreatedDomainEvent.fromAggregate(comment)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
