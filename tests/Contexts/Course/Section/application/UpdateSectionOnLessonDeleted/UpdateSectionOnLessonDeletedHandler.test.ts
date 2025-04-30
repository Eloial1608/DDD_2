import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SectionRepositoryMock } from '../../__mocks__/SectionRepositoryMock'
import { UpdateSectionOnLessonDeletedHandler } from '@Course/Section/application/UpdateSectionOnLessonDeleted/UpdateSectionOnLessonDeletedHandler'
import { Updater } from '@Course/Section/application/UpdateSectionOnLessonDeleted/Updater'
import { SectionMother } from '../../domain/SectionMother'
import { LessonMother } from '@Tests/Contexts/Course/Lesson/domain/LessonMother'
import { TotalLessons } from '@Course/Section/domain/ValueObjects/TotalLessons'
import { LessonDeletedDomainEvent } from '@Course/Lesson/domain/Events/LessonDeletedDomainEvent'
import { SectionTotalLessonsUpdatedDomainEvent } from '@Course/Section/domain/events/SectionTotalLessonsUpdatedDomainEvent'

let eventBus: EventBusMock
let repository: SectionRepositoryMock
let handler: UpdateSectionOnLessonDeletedHandler
let updater: Updater

describe('UpdateSectionOnLessonDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new SectionRepositoryMock()
    updater = new Updater(repository, eventBus)
    handler = new UpdateSectionOnLessonDeletedHandler(updater)
  })

  test('Update a section', async () => {
    const section = SectionMother.random()

    const lesson = LessonMother.random()

    const expectedSection = SectionMother.create({
      ...section,
      totalLessons: new TotalLessons(section.totalLessons.valueOf() - 1)
    })

    repository.returnOnFind(section)

    const event = LessonDeletedDomainEvent.fromAggregate(lesson)

    await handler.on(event)

    repository.assertPersistHasBeenCalledWith(expectedSection)
  })

  test('Create a new SectionTotalLessonsUpdatedDomainEvent', async () => {
    const section = SectionMother.random()

    const lesson = LessonMother.random()

    repository.returnOnFind(section)

    const event = LessonDeletedDomainEvent.fromAggregate(lesson)

    await handler.on(event)

    const expectedSection = SectionMother.create({
      ...section,
      totalLessons: new TotalLessons(section.totalLessons.valueOf() - 1)
    })

    const expectedEvent = SectionTotalLessonsUpdatedDomainEvent.fromAggregate(expectedSection)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
