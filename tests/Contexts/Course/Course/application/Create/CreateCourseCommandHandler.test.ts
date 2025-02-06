import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { CourseRepositoryMock } from '../../__mocks__/CourseRepositoryMock'
import { CreateCourseCommandHandler } from '@Course/Course/application/Create/CreateCourseCommandHandler'
import { Creator } from '@Course/Course/application/Create/Creator'
import { CourseMother } from '../../domain/CourseMother'
import { CreateCourseCommandMother } from './CreateCourseCommandMother'
import { CourseCreatedDomainEvent } from '@Course/Course/domain/Events/CourseCreatedDomainEvent'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { UserMother } from '@Tests/Contexts/Course/User/domain/UserMother'
import { SpaceMother } from '@Tests/Contexts/Course/Space/domain/SpaceMother'
import { FindUsersByCriteriaQuery } from '@Course/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { FindSpaceByIdQuery } from '@Course/Space/application/FindById/FindSpaceByIdQuery'
import { UserCollectionResponse } from '@Course/User/application/UserCollectionResponse'
import { SpaceResponse } from '@Course/Space/application/SpaceResponse'

let eventBus: EventBusMock
let queryBus: QueryBusMock
let repository: CourseRepositoryMock
let handler: CreateCourseCommandHandler
let creator: Creator

describe('CreateCourseCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    queryBus = new QueryBusMock()
    repository = new CourseRepositoryMock()
    creator = new Creator(repository, eventBus, queryBus)
    handler = new CreateCourseCommandHandler(creator)
  })

  test('create a new Course', async () => {
    const user = UserMother.random()

    const course = CourseMother.forAuthor(user)

    const space = SpaceMother.create({ communityId: course.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = CreateCourseCommandMother.fromAggregate(course)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(course)
  })

  test('Create a new CourseCreateDomainEvent', async () => {
    const user = UserMother.random()

    const course = CourseMother.forAuthor(user)

    const space = SpaceMother.create({ communityId: course.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = CreateCourseCommandMother.fromAggregate(course)

    await handler.handle(command)

    const expectedEvent = CourseCreatedDomainEvent.fromAggregate(course)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
