import { UpdateCourseOnUserUpdatedHandler } from '@Course/Course/application/UpdateCourseOnUserUpdated/UpdateCourseOnUserUpdatedHandler'
import { Updater } from '@Course/Course/application/UpdateCourseOnUserUpdated/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { CourseRepositoryMock } from '../../__mocks__/CourseRepositoryMock'
import { CourseMother } from '../../domain/CourseMother'
import { UserMother } from '@Tests/Contexts/Course/User/domain/UserMother'
import { UserCreatedDomainEvent } from '@Course/User/domain/Events/UserCreatedDomainEvent'
import { Author } from '@Course/Course/domain/ValueObjects/Author'
import { CourseAuthorUpdatedDomainEvent } from '@Course/Course/domain/Events/CourseAuthorUpdatedDomainEvent'

let eventBus: EventBusMock
let repository: CourseRepositoryMock
let handler: UpdateCourseOnUserUpdatedHandler
let updater: Updater

describe('UpdateCourseOnUserUpdatedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new CourseRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateCourseOnUserUpdatedHandler(updater)
  })

  test('Update a course', async () => {
    const course = CourseMother.random()

    const user = UserMother.random()

    const expectedCourse = CourseMother.create({
      ...course,
      author: new Author(
        user.id.valueOf(),
        user.mainId.valueOf(),
        user.name.valueOf(),
        user.username.valueOf(),
        user.pictureUrl?.valueOf(),
        user.bannerUrl?.valueOf()
      )
    })

    repository.returnOnSearch([course])

    const event = UserCreatedDomainEvent.fromAggregate(user)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(expectedCourse)
  })

  test('Create a new CourseTotalUsersUpdatedDomainEvent', async () => {
    const course = CourseMother.random()

    const user = UserMother.random()

    repository.returnOnSearch([course])

    const event = UserCreatedDomainEvent.fromAggregate(user)

    await handler.on(event)

    const expectedCourse = CourseMother.create({
      ...course,
      author: new Author(
        user.id.valueOf(),
        user.mainId.valueOf(),
        user.name.valueOf(),
        user.username.valueOf(),
        user.pictureUrl?.valueOf(),
        user.bannerUrl?.valueOf()
      )
    })

    const expectedEvent = CourseAuthorUpdatedDomainEvent.fromAggregate(expectedCourse)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
