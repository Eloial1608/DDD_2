import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { ProjectUserRepositoryMock } from '../../__mocks__/ProjectUserRepositoryMock'
import { ProjectUserMother } from '../../domain/ProjectUserMother'
import { ProjectUserCreatedDomainEvent } from '@Projects/ProjectUser/domain/Events/ProjectUserCreatedDomainEvent'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { ProjectMother } from '@Tests/Contexts/Projects/Project/domain/ProjectMother'
import { CreateProjectUserCommandMother } from './CreateProjectUserCommandMother'
import { CreateProjectUserCommandHandler } from '@Projects/ProjectUser/application/Create/CreateProjectCommandHandler'
import { Creator } from '@Projects/ProjectUser/application/Create/Creator'

let repository: ProjectUserRepositoryMock
let eventBus: EventBusMock
let queryBus: QueryBusMock
let handler: CreateProjectUserCommandHandler
let creator: Creator

describe('CreateProjectUserCommandHandler should ', () => {
  beforeEach(() => {
    repository = new ProjectUserRepositoryMock()
    eventBus = new EventBusMock()
    queryBus = new QueryBusMock()
    creator = new Creator(repository, eventBus, queryBus)
    handler = new CreateProjectUserCommandHandler(creator)
  })

  test('Create a project user', async () => {
    const project = ProjectMother.random()

    const projectUser = ProjectUserMother.create({
      projectId: project.id
    })

    const command = CreateProjectUserCommandMother.fromAggregate(projectUser)

    queryBus.returnOnAsk(new ProjectResponse(project))

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(projectUser)
  })

  test('create a new ProjectUserCreatedDomainEvent', async () => {
    const project = ProjectMother.random()

    const projectUser = ProjectUserMother.create({
      projectId: project.id
    })

    const command = CreateProjectUserCommandMother.fromAggregate(projectUser)

    queryBus.returnOnAsk(new ProjectResponse(project))

    await handler.handle(command)

    const expectedEvent = ProjectUserCreatedDomainEvent.fromAggregate(projectUser)

    eventBus.assertLastPublishedEventIs(expectedEvent)
  })
})
