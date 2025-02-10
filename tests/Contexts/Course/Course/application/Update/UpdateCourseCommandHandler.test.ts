import { UpdateCourseCommandHandler } from '@Course/Course/application/Update/UpdateCourseCommandHandler'
import { Updater } from '@Course/Course/application/Update/Updater'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { CourseRepositoryMock } from '../../__mocks__/CourseRepositoryMock'
import { CourseMother } from '../../domain/CourseMother'
import { UpdateCourseCommandMother } from './UpdateCourseCommandMother'
import { CourseUpdatedDomainEvent } from '@Course/Course/domain/Events/CourseUpdatedDomainEvent'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { UserMother } from '@Tests/Contexts/Course/User/domain/UserMother'
import { UserCollectionResponse } from '@Course/User/application/UserCollectionResponse'
import { CourseNotFound } from '@Course/Course/domain/Errors/CourseNotFound'
import { FindUsersByCriteriaQuery } from '@Course/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { FindSpaceByIdQuery } from '@Course/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Course/Space/application/SpaceResponse'
import { SpaceMother } from '@Tests/Contexts/Course/Space/domain/SpaceMother'
import { StartDate } from '@Course/Course/domain/ValueObjects/StartDate'
import { EndDate } from '@Course/Course/domain/ValueObjects/EndDate'
import { EndDateEarlierThanStartDate } from '@Course/Course/domain/Errors/EndDateEarlierThanStartDate'
import { MaxStudents } from '@Course/Course/domain/ValueObjects/MaxStudents'
import { TotalStudents } from '@Course/Course/domain/ValueObjects/TotalStudents'
import { MaxStudentsLowerThanTotalStudents } from '@Course/Course/domain/Errors/MaxStudentsLowerThanTotalStudents'

let eventBus: EventBusMock
let repository: CourseRepositoryMock
let queryBus: QueryBusMock
let handler: UpdateCourseCommandHandler
let updater: Updater

describe('UpdateCourseCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new CourseRepositoryMock()
    queryBus = new QueryBusMock()
    updater = new Updater(repository, eventBus, queryBus)
    handler = new UpdateCourseCommandHandler(updater)
  })

  test('Update a course', async () => {
    const user = UserMother.random()

    const course = CourseMother.forAuthor(user)

    const existingCourse = CourseMother.create({
      id: course.id,
      author: course.author,
      userId: course.userId,
      spaceId: course.spaceId,
      communityId: course.communityId
    })

    repository.returnOnFind(existingCourse)

    const space = SpaceMother.create({ communityId: course.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = UpdateCourseCommandMother.fromAggregate(course)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(course)
  })

  test('Fail if the user doesnt exists', async () => {
    const user = UserMother.random()

    const course = CourseMother.forAuthor(user)

    const space = SpaceMother.create({ communityId: course.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = UpdateCourseCommandMother.fromAggregate(course)

    expect(handler.handle(command)).rejects.toThrow(CourseNotFound)
  })

  test('Fail if end date is earlier than start date', async () => {
    const user = UserMother.random()

    const course = CourseMother.forAuthor(user)

    const existingCourse = CourseMother.create({
      id: course.id,
      author: course.author,
      userId: course.userId,
      spaceId: course.spaceId,
      communityId: course.communityId,
      maxStudents: new MaxStudents(2),
      totalStudents: new TotalStudents(3),
      startDate: new StartDate(new Date()),
      endDate: new EndDate(new Date())
    })

    repository.returnOnFind(existingCourse)

    const space = SpaceMother.create({ communityId: course.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = UpdateCourseCommandMother.fromAggregate(course)

    expect(handler.handle(command)).rejects.toThrow(EndDateEarlierThanStartDate)
  })

  test('Fail if max students is lower than total students', async () => {
    const user = UserMother.random()

    const course = CourseMother.forAuthor(user)

    const existingCourse = CourseMother.create({
      id: course.id,
      author: course.author,
      userId: course.userId,
      spaceId: course.spaceId,
      communityId: course.communityId,
      maxStudents: new MaxStudents(2),
      totalStudents: new TotalStudents(3)
    })

    repository.returnOnFind(existingCourse)

    const space = SpaceMother.create({ communityId: course.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = UpdateCourseCommandMother.fromAggregate(course)

    expect(handler.handle(command)).rejects.toThrow(MaxStudentsLowerThanTotalStudents)
  })

  test('Create a new CourseUpdatedDomainEvent', async () => {
    const user = UserMother.random()

    const course = CourseMother.forAuthor(user)

    const existingCourse = CourseMother.create({
      id: course.id,
      author: course.author,
      userId: course.userId,
      spaceId: course.spaceId,
      communityId: course.communityId
    })

    repository.returnOnFind(existingCourse)

    const space = SpaceMother.create({ communityId: course.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = UpdateCourseCommandMother.fromAggregate(course)

    await handler.handle(command)

    const expectedEvent = CourseUpdatedDomainEvent.fromAggregate(course)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
