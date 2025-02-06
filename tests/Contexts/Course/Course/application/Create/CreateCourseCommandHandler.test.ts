import EventBusMock from "@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock";
import { CourseRepositoryMock } from "../../__mocks__/CourseRepositoryMock";
import { CreateCourseCommandHandler } from "@Course/Course/application/Create/CreateCourseCommandHandler";
import { Creator } from "@Course/Course/application/Create/Creator";
import { CourseMother } from "../../domain/CourseMother";
import { CreateCourseCommandMother } from "./CreateCourseCommandMother";
import { CourseCreatedDomainEvent } from "@Course/Course/domain/events/CourseCreatedDomainEvent";

let eventBus: EventBusMock
let repository: CourseRepositoryMock
let handler: CreateCourseCommandHandler
let creator: Creator

describe('CreateCourseCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new CourseRepositoryMock()
    creator = new Creator(repository,eventBus)
    handler = new CreateCourseCommandHandler(creator)
  })

  test('create a new Course', async () =>{
    const course = CourseMother.random()

    const command = CreateCourseCommandMother.fromAggregate(course)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(course)
  })

  test('Create a new CourseCreateDomainEvent',async () =>{
    const course = CourseMother.random()

    const command = CreateCourseCommandMother.fromAggregate(course)

    await handler.handle(command)

    const expectedEvent = CourseCreatedDomainEvent.fromAggregate(course)

    eventBus.assertEventHasBeenPublished(expectedEvent )
  })
})