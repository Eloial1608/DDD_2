import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SectionRepositoryMock } from '../../__mocks__/SectionRepositoryMock'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { UpdateSectionCommandHandler } from '@Course/Section/application/Update/UpdateSectionCommandHandler'
import { Updater } from '@Course/Section/application/Update/Updater'
import { CourseMother } from '@Tests/Contexts/Course/Course/domain/CourseMother'
import { SectionMother } from '../../domain/SectionMother'
import { FindCourseByIdQuery } from '@Course/Course/application/FindById/FindCourseByIdQuery'
import { CourseResponse } from '@Course/Course/application/CourseResponse'
import { UpdateSectionCommandMother } from './UpdateSectionCommandMother'
import { SectionUpdatedDomainEvent } from '@Course/Section/domain/events/SectionUpdatedDomainEvent'
import { SectionNotFound } from '@Course/Section/domain/Errors/SectionNotFound'

let eventBus: EventBusMock
let repository: SectionRepositoryMock
let queryBus: QueryBusMock
let handler: UpdateSectionCommandHandler
let updater: Updater

describe('UpdateSectionCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new SectionRepositoryMock()
    queryBus = new QueryBusMock()
    updater = new Updater(repository, eventBus, queryBus)
    handler = new UpdateSectionCommandHandler(updater)
  })

  test('Update a section', async () => {
    const course = CourseMother.random()

    const section = SectionMother.create({ courseId: course.id })

    const existingSection = SectionMother.create({
      id: section.id,
      courseId: section.courseId
    })

    repository.returnOnFind(existingSection)

    queryBus.returnOnQuery(new FindCourseByIdQuery(course.id.valueOf()), new CourseResponse(course))

    const command = UpdateSectionCommandMother.fromAggregate(section)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(section)
  })

  test('Fail if the section doesnt exists', async () => {
    const course = CourseMother.random()

    const section = SectionMother.create({ courseId: course.id })

    queryBus.returnOnQuery(new FindCourseByIdQuery(course.id.valueOf()), new CourseResponse(course))

    const command = UpdateSectionCommandMother.fromAggregate(section)

    expect(handler.handle(command)).rejects.toThrow(SectionNotFound)
  })

  test('Create a new CourseUpdatedDomainEvent', async () => {
    const course = CourseMother.random()

    const section = SectionMother.create({ courseId: course.id })

    const existingSection = SectionMother.create({
      id: section.id,
      courseId: section.courseId
    })

    repository.returnOnFind(existingSection)

    queryBus.returnOnQuery(new FindCourseByIdQuery(course.id.valueOf()), new CourseResponse(course))

    const command = UpdateSectionCommandMother.fromAggregate(section)

    await handler.handle(command)

    const expectedEvent = SectionUpdatedDomainEvent.fromAggregate(section)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
