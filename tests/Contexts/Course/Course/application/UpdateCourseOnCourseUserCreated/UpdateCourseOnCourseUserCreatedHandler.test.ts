import { UpdateCourseOnCourseUserCreatedHandler } from '@Course/Course/application/UpdateCourseOnCourseUserCreated/UpdateCourseOnCourseUserCreatedHandler'
import { Updater } from '@Course/Course/application/UpdateCourseOnCourseUserCreated/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { CourseRepositoryMock } from '../../__mocks__/CourseRepositoryMock'
import { CourseMother } from '../../domain/CourseMother'
import { CourseUserMother } from '@Tests/Contexts/Course/CourseUser/domain/CourseUserMother'
import { CourseUserCreatedDomainEvent } from '@Course/CourseUser/domain/Events/CourseUserCreatedDomainEvent'
import { TotalStudents } from '@Course/Course/domain/ValueObjects/TotalStudents'
import { CourseTotalStudentsUpdatedDomainEvent } from '@Course/Course/domain/Events/CourseTotalStudentsUpdatedDomainEvent'

let eventBus: EventBusMock
let repository: CourseRepositoryMock
let handler: UpdateCourseOnCourseUserCreatedHandler
let updater: Updater

describe('UpdateCourseOnCourseUserCreatedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new CourseRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateCourseOnCourseUserCreatedHandler(updater)
  })

  test('Update a course', async () => {
    const course = CourseMother.random()

    const courseUser = CourseUserMother.random()

    const expectedCourse = CourseMother.create({
      ...course,
      totalStudents: new TotalStudents(course.totalStudents.valueOf() + 1)
    })

    repository.returnOnFind(course)

    const event = CourseUserCreatedDomainEvent.fromAggregate(courseUser)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(expectedCourse)
  })

  test('Create a new CourseTotalCourseUsersUpdatedDomainEvent', async () => {
    const course = CourseMother.random()

    const courseUser = CourseUserMother.random()

    repository.returnOnFind(course)

    const event = CourseUserCreatedDomainEvent.fromAggregate(courseUser)

    await handler.on(event)

    const expectedCourse = CourseMother.create({
      ...course,
      totalStudents: new TotalStudents(course.totalStudents.valueOf() + 1)
    })

    const expectedEvent = CourseTotalStudentsUpdatedDomainEvent.fromAggregate(expectedCourse)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
