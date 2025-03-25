import { UpdateCourseOnCommentDeletedHandler } from '@Course/Course/application/UpdateCourseOnCommentDeleted/UpdateCourseOnCommentDeletedHandler'
import { Updater } from '@Course/Course/application/UpdateCourseOnCommentDeleted/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { CourseRepositoryMock } from '../../__mocks__/CourseRepositoryMock'
import { CourseMother } from '../../domain/CourseMother'
import { CommentMother } from '@Tests/Contexts/Course/Comment/domain/CommentMother'
import { CommentDeletedDomainEvent } from '@Course/Comment/domain/Events/CommentDeletedDomainEvent'
import { CourseTotalCommentsUpdatedDomainEvent } from '@Course/Course/domain/Events/CourseTotalCommentsUpdatedDomainEvent'

let eventBus: EventBusMock
let repository: CourseRepositoryMock
let handler: UpdateCourseOnCommentDeletedHandler
let updater: Updater

describe('UpdateCourseOnCommentDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new CourseRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateCourseOnCommentDeletedHandler(updater)
  })

  test('Update a course', async () => {
    const course = CourseMother.random()

    const comment = CommentMother.random()

    repository.returnOnFind(course)

    const event = CommentDeletedDomainEvent.fromAggregate(comment)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(course)
  })

  test('Create a new CourseTotalCommentsUpdatedDomainEvent', async () => {
    const course = CourseMother.random()

    const comment = CommentMother.random()

    repository.returnOnFind(course)

    const event = CommentDeletedDomainEvent.fromAggregate(comment)

    await handler.on(event)

    const expectedEvent = CourseTotalCommentsUpdatedDomainEvent.fromAggregate(course)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
