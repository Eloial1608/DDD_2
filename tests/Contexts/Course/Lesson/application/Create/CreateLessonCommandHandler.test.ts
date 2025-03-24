import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { LessonRepositoryMock } from '../../__mocks__/LessonRepositoryMock'
import { CreateLessonCommandHandler } from '@Course/Lesson/application/Create/CreateLessonCommandHandler'
import { Creator } from '@Course/Lesson/application/Create/Creator'
import { LessonMother } from '../../domain/LessonMother'
import { SectionMother } from '@Tests/Contexts/Course/Section/domain/SectionMother'
import { SectionResponse } from '@Course/Section/application/SectionResponse'
import { FindSectionByIdQuery } from '@Course/Section/application/FindById/FindSectionByIdQuery'
import { CreateLessonCommandMother } from './CreateLessonCommandMother'
import { LessonCreatedDomainEvent } from '@Course/Lesson/domain/Events/LessonCreatedDomainEvent'

let eventBus: EventBusMock
let repository: LessonRepositoryMock
let queryBus: QueryBusMock
let handler: CreateLessonCommandHandler
let creator: Creator

describe('CreateLessonCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new LessonRepositoryMock()
    queryBus = new QueryBusMock()
    creator = new Creator(repository, eventBus, queryBus)
    handler = new CreateLessonCommandHandler(creator)
  })

  test('Create a new lesson', async () => {
    const lesson = LessonMother.random()

    const section = SectionMother.create({ id: lesson.sectionId })

    queryBus.returnOnQuery(new FindSectionByIdQuery(section.id.valueOf()), new SectionResponse(section))

    const command = CreateLessonCommandMother.fromAggregate(lesson)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(lesson)
  })

  test('Fail if a lesson with the same id already exists', async () => {
    const lesson = LessonMother.random()

    const existingLesson = LessonMother.create({ id: lesson.id })

    const section = SectionMother.create({ id: lesson.sectionId })

    queryBus.returnOnQuery(new FindSectionByIdQuery(section.id.valueOf()), new SectionResponse(section))

    const command = CreateLessonCommandMother.fromAggregate(lesson)

    repository.returnOnFind(existingLesson)

    await handler.handle(command)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new LessonCreatedDomainEvent', async () => {
    const lesson = LessonMother.random()

    const section = SectionMother.create({ id: lesson.sectionId })

    queryBus.returnOnQuery(new FindSectionByIdQuery(section.id.valueOf()), new SectionResponse(section))

    const command = CreateLessonCommandMother.fromAggregate(lesson)

    await handler.handle(command)

    const expectedEvent = LessonCreatedDomainEvent.fromAggregate(lesson)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
