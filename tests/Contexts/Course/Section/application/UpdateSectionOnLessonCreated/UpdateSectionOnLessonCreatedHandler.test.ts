import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SectionRepositoryMock } from '../../__mocks__/SectionRepositoryMock'
import { UpdateSectionOnLessonCreatedHandler } from '@Course/Section/application/UpdateSectionOnLessonCreated/UpdateSectionOnLessonCreatedHandler'
import { Updater } from '@Course/Section/application/UpdateSectionOnLessonCreated/Updater'
import { SectionMother } from '../../domain/SectionMother'
import { LessonMother } from '@Tests/Contexts/Course/Lesson/domain/LessonMother'
import { TotalLessons } from '@Course/Section/domain/ValueObjects/TotalLessons'
import { LessonCreatedDomainEvent } from '@Course/Lesson/domain/Events/LessonCreatedDomainEvent'
import { SectionTotalLessonsUpdatedDomainEvent } from '@Course/Section/domain/events/SectionTotalLessonsUpdatedDomainEvent'

let eventBus: EventBusMock
let repository: SectionRepositoryMock
let handler: UpdateSectionOnLessonCreatedHandler
let updater: Updater

describe('UpdateSectionOnLessonCreatedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new SectionRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateSectionOnLessonCreatedHandler(updater)
  })

  test('Update a section', async () => {
    const section = SectionMother.random()

    const lesson = LessonMother.random()

    const expectedSection = SectionMother.create({
      ...section,
      totalLessons: new TotalLessons(section.totalLessons.valueOf() + 1)
    })

    repository.returnOnFind(section)

    const event = LessonCreatedDomainEvent.fromAggregate(lesson)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(expectedSection)
  })

  test('Create a new SectionTotalLessonsUpdatedDomainEvent', async () => {
    const section = SectionMother.random()

    const lesson = LessonMother.random()

    repository.returnOnFind(section)

    const event = LessonCreatedDomainEvent.fromAggregate(lesson)

    await handler.on(event)

    const expectedSection = SectionMother.create({
      ...section,
      totalLessons: new TotalLessons(section.totalLessons.valueOf() + 1)
    })

    const expectedEvent = SectionTotalLessonsUpdatedDomainEvent.fromAggregate(expectedSection)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
