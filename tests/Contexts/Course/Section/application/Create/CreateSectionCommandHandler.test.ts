import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { SectionRepositoryMock } from '../../__mocks__/SectionRepositoryMock'
import { CreateSectionCommandHandler } from '@Course/Section/application/Create/CreateSectionCommandHandler'
import { Creator } from '@Course/Section/application/Create/Creator'
import { SectionMother } from '../../domain/SectionMother'
import { CreateSectionCommandMother } from './CreateSectionCommandMother'
import { SectionCreatedDomainEvent } from '@Course/Section/domain/events/SectionCreatedDomainEvent'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { CourseMother } from '@Tests/Contexts/Course/Course/domain/CourseMother'
import { FindCourseByIdQuery } from '@Course/Course/application/FindById/FindCourseByIdQuery'
import { CourseResponse } from '@Course/Course/application/CourseResponse'

let eventBus: EventBusMock
let queryBus: QueryBusMock
let repository: SectionRepositoryMock
let handler: CreateSectionCommandHandler
let creator: Creator

describe('CreateSectionCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    queryBus = new QueryBusMock()
    repository = new SectionRepositoryMock()
    creator = new Creator(repository, eventBus, queryBus)
    handler = new CreateSectionCommandHandler(creator)
  })

  test('create a new Section', async () => {
    const course = CourseMother.random()

    const section = SectionMother.create({ courseId: course.id })

    const command = CreateSectionCommandMother.fromAggregate(section)

    queryBus.returnOnQuery(new FindCourseByIdQuery(course.id.valueOf()), new CourseResponse(course))

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(section)
  })

  test('Create a new SectionCreateDomainEvent', async () => {
    const course = CourseMother.random()

    const section = SectionMother.random()

    const command = CreateSectionCommandMother.fromAggregate(section)

    queryBus.returnOnQuery(new FindCourseByIdQuery(course.id.valueOf()), new CourseResponse(course))

    await handler.handle(command)

    const expectedEvent = SectionCreatedDomainEvent.fromAggregate(section)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
