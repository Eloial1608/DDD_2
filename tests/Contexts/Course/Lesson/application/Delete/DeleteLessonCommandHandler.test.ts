import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { LessonRepositoryMock } from '../../__mocks__/LessonRepositoryMock'
import { Deleter } from '@Course/Lesson/application/Delete/Deleter'
import { DeleteLessonCommandHandler } from '@Course/Lesson/application/Delete/DeleteLessonCommandHandler'
import { LessonMother } from '../../domain/LessonMother'
import { DeletedAt } from '@Course/Lesson/domain/ValueObjects/DeletedAt'
import { DeleteLessonCommandMother } from './DeleteLessonCommandMother'
import { LessonDeletedDomainEvent } from '@Course/Lesson/domain/events/LessonDeletedDomainEvent'

let eventBus: EventBusMock
let repository: LessonRepositoryMock
let handler: DeleteLessonCommandHandler
let deleter: Deleter

describe('DeleteLessonCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new LessonRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteLessonCommandHandler(deleter)
  })

  test('Delete a lesson', async () => {
    const lesson = LessonMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = LessonMother.create({ ...lesson, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteLessonCommandMother.fromAggregate(lesson)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(lesson)
  })

  test('Create a new LessonDeletedDomainEvent', async () => {
    const lesson = LessonMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = LessonMother.create({ ...lesson, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteLessonCommandMother.fromAggregate(lesson)

    await handler.handle(command)

    const expectedEvent = LessonDeletedDomainEvent.fromAggregate(lesson)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
