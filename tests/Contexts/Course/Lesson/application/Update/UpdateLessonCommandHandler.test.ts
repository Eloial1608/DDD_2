import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { LessonRepositoryMock } from '../../__mocks__/LessonRepositoryMock'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { UpdateLessonCommandHandler } from '@Course/Lesson/application/Update/UpdateLessonCommandHandler'
import { Updater } from '@Course/Lesson/application/Update/Updater'
import { LessonMother } from '../../domain/LessonMother'
import { UpdateLessonCommandMother } from './UpdateLessonCommandMother'
import { LessonUpdatedDomainEvent } from '@Course/Lesson/domain/Eventss/LessonUpdatedDomainEvent'
import { LessonNotFound } from '@Course/Lesson/domain/Errors/LessonNotFound'
import { SectionMother } from '@Tests/Contexts/Course/Section/domain/SectionMother'
import { FindSectionByIdQuery } from '@Course/Section/application/FindById/FindSectionByIdQuery'
import { SectionResponse } from '@Course/Section/application/SectionResponse'

let eventBus: EventBusMock
let repository: LessonRepositoryMock
let queryBus: QueryBusMock
let handler: UpdateLessonCommandHandler
let updater: Updater

describe('UpdateLessonCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new LessonRepositoryMock()
    queryBus = new QueryBusMock()
    updater = new Updater(repository, eventBus, queryBus)
    handler = new UpdateLessonCommandHandler(updater)
  })

  test('Update a lesson', async () => {
    const section = SectionMother.random()

    const lesson = LessonMother.create({ sectionId: section.id })

    const existingLesson = LessonMother.create({
      id: lesson.id,
      sectionId: lesson.sectionId
    })

    repository.returnOnFind(existingLesson)

    queryBus.returnOnQuery(new FindSectionByIdQuery(section.id.valueOf()), new SectionResponse(section))

    const command = UpdateLessonCommandMother.fromAggregate(lesson)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(lesson)
  })

  test('Fail if the lesson doesnt exists', async () => {
    const section = SectionMother.random()

    const lesson = LessonMother.create({ sectionId: section.id })

    queryBus.returnOnQuery(new FindSectionByIdQuery(section.id.valueOf()), new SectionResponse(section))

    const command = UpdateLessonCommandMother.fromAggregate(lesson)

    expect(handler.handle(command)).rejects.toThrow(LessonNotFound)
  })

  test('Create a new LessonUpdatedDomainEvent', async () => {
    const section = SectionMother.random()

    const lesson = LessonMother.create({ sectionId: section.id })

    const existingLesson = LessonMother.create({
      id: lesson.id,
      sectionId: lesson.sectionId
    })

    repository.returnOnFind(existingLesson)

    queryBus.returnOnQuery(new FindSectionByIdQuery(section.id.valueOf()), new SectionResponse(section))

    const command = UpdateLessonCommandMother.fromAggregate(lesson)

    await handler.handle(command)

    const expectedEvent = LessonUpdatedDomainEvent.fromAggregate(lesson)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
