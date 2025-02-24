import { DeleteCourseCommandHandler } from '@Course/Course/application/Delete/DeleteCourseCommandHandler'
import { Deleter } from '@Course/Course/application/Delete/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { CourseRepositoryMock } from '../../__mocks__/CourseRepositoryMock'
import { CourseMother } from '../../domain/CourseMother'
import { DeleteCourseCommandMother } from './DeleteCourseCommandMother'
import { DeletedAt } from '@Course/Course/domain/ValueObjects/DeletedAt'
import { CourseDeletedDomainEvent } from '@Course/Course/domain/Events/CourseDeletedDomainEvent'

let eventBus: EventBusMock
let repository: CourseRepositoryMock
let handler: DeleteCourseCommandHandler
let deleter: Deleter

describe('DeleteCourseCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new CourseRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteCourseCommandHandler(deleter)
  })

  test('Delete a course', async () => {
    const course = CourseMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = CourseMother.create({ ...course, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteCourseCommandMother.fromAggregate(course)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(course)
  })

  test('Create a new CourseDeletedDomainEvent', async () => {
    const course = CourseMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = CourseMother.create({ ...course, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteCourseCommandMother.fromAggregate(course)

    await handler.handle(command)

    const expectedEvent = CourseDeletedDomainEvent.fromAggregate(course)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
