import { CreateTaskCommandHandler } from '@Projects/Task/application/Create/CreateTaskCommandHandler'
import { Creator } from '@Projects/Task/application/Create/Creator'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { TaskRepositoryMock } from '../../__mocks__/TaskRepositoryMock'
import { TaskMother } from '../../domain/TaskMother'
import { CreateTaskCommandMother } from './CreateTaskCommandMother'
import { TaskCreatedDomainEvent } from '@Projects/Task/domain/Events/TaskCreatedDomainEvent'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { UserMother } from '@Tests/Contexts/Projects/User/domain/UserMother'
import { UserCollectionResponse } from '@Projects/User/application/UserCollectionResponse'
import { FindUsersByCriteriaQuery } from '@Projects/User/application/FindByCriteria/FindUsersByCriteriaQuery'

let eventBus: EventBusMock
let repository: TaskRepositoryMock
let queryBus: QueryBusMock
let handler: CreateTaskCommandHandler
let creator: Creator

describe('CreateTaskCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new TaskRepositoryMock()
    queryBus = new QueryBusMock()
    creator = new Creator(repository, queryBus, eventBus)
    handler = new CreateTaskCommandHandler(creator)
  })

  test('Create a new task', async () => {
    const user = UserMother.random()

    const task = TaskMother.random()

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))

    const command = CreateTaskCommandMother.fromAggregate(task)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(task)
  })

  test('Fail if a task with the same id already exists', async () => {
    const user = UserMother.random()

    const task = TaskMother.forAuthor(user)

    const existingTask = TaskMother.create({ id: task.id })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))

    const command = CreateTaskCommandMother.fromAggregate(task)

    repository.returnOnFind(existingTask)

    await handler.handle(command)

    repository.assertPersistHasNotBeenCalled()
  })

  test('Create a new TaskCreatedDomainEvent', async () => {
    const user = UserMother.random()

    const task = TaskMother.forAuthor(user)

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user]))

    const command = CreateTaskCommandMother.fromAggregate(task)

    await handler.handle(command)

    const expectedEvent = TaskCreatedDomainEvent.fromAggregate(task)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
