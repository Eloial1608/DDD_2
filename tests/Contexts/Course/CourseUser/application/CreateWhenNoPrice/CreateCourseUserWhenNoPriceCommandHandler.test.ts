import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { CourseUserRepositoryMock } from '../../__mocks__/CourseUserRepositoryMock'
import { CreateCourseUserWhenNoPriceCommandHandler } from '@Course/CourseUser/application/CreateWhenNoPrice/CreateCourseUserWhenNoPriceCommandHandler'
import { Creator } from '@Course/CourseUser/application/CreateWhenNoPrice/Creator'
import { CourseUserMother } from '../../domain/CourseUserMother'
import { CourseUserCreatedDomainEvent } from '@Course/CourseUser/domain/Events/CourseUserCreatedDomainEvent'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { CourseMother } from '@Tests/Contexts/Course/Course/domain/CourseMother'
import { CreateCourseUserWhenNoPriceCommandMother } from './CreateCourseUserWhenNoPriceCommandMother'
import { CourseResponse } from '@Course/Course/application/CourseResponse'
import { IsPaid } from '@Course/Course/domain/ValueObjects/IsPaid'
import { NotAllowedToPersistCourseUser } from '@Course/CourseUser/domain/Errors/NotAllowedToPersistCourseUser'

let repository: CourseUserRepositoryMock
let eventBus: EventBusMock
let queryBus: QueryBusMock
let handler: CreateCourseUserWhenNoPriceCommandHandler
let creator: Creator

describe('CreateCourseUserWhenNoPriceCommandHandler should ', () => {
  beforeEach(() => {
    repository = new CourseUserRepositoryMock()
    eventBus = new EventBusMock()
    queryBus = new QueryBusMock()
    creator = new Creator(repository, queryBus, eventBus)
    handler = new CreateCourseUserWhenNoPriceCommandHandler(creator)
  })

  test('Create a course user', async () => {
    const course = CourseMother.random()

    const courseUser = CourseUserMother.create({
      courseId: course.id
    })

    const command = CreateCourseUserWhenNoPriceCommandMother.fromAggregate(courseUser)

    queryBus.returnOnAsk(new CourseResponse(course))

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(courseUser)
  })

  test('Fail if the course is paid', async () => {
    const course = CourseMother.create({
      isPaid: new IsPaid(true)
    })

    const courseUser = CourseUserMother.create({
      courseId: course.id
    })

    const command = CreateCourseUserWhenNoPriceCommandMother.fromAggregate(courseUser)

    queryBus.returnOnAsk(new CourseResponse(course))

    expect(handler.handle(command)).rejects.toThrow(NotAllowedToPersistCourseUser)
  })

  test('create a new CourseUserCreatedDomainEvent', async () => {
    const course = CourseMother.random()

    const courseUser = CourseUserMother.create({
      courseId: course.id
    })

    const command = CreateCourseUserWhenNoPriceCommandMother.fromAggregate(courseUser)

    queryBus.returnOnAsk(new CourseResponse(course))

    await handler.handle(command)

    const expectedEvent = CourseUserCreatedDomainEvent.fromAggregate(courseUser)

    eventBus.assertLastPublishedEventIs(expectedEvent)
  })
})
