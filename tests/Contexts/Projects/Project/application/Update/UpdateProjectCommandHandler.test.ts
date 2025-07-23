import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { QueryBusMock } from '@Tests/Contexts/Shared/infrastructure/QueryBus/QueryBusMock'
import { Updater } from '@Projects/Project/application/Update/Updater'
import { ProjectMother } from '../../domain/ProjectMother'
import { FindUsersByCriteriaQuery } from '@Projects/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Projects/User/application/UserCollectionResponse'
import { FindSpaceByIdQuery } from '@Projects/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Projects/Space/application/SpaceResponse'
import { UpdateProjectCommandMother } from './UpdateProjectCommandMother'
import { ProjectNotFound } from '@Projects/Project/domain/Errors/ProjectNotFound'
import { ProjectUpdatedDomainEvent } from '@Projects/Project/domain/Events/ProjectUpdatedDomainEvent'
import { ProjectRepositoryMock } from '../../__mocks__/ProjectRepositoryMock'
import { UpdateProjectCommandHandler } from '@Projects/Project/application/Update/UpdateProjectCommandHandler'
import { UserMother } from '@Tests/Contexts/Projects/User/domain/UserMother'
import { SpaceMother } from '@Tests/Contexts/Projects/Space/domain/SpaceMother'

let eventBus: EventBusMock
let repository: ProjectRepositoryMock
let queryBus: QueryBusMock
let handler: UpdateProjectCommandHandler
let updater: Updater

describe('UpdateProjectCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new ProjectRepositoryMock()
    queryBus = new QueryBusMock()
    updater = new Updater(repository, eventBus, queryBus)
    handler = new UpdateProjectCommandHandler(updater)
  })

  test('Update a project', async () => {
    const user = UserMother.random()
    const leadUser = UserMother.random()

    const project = ProjectMother.forLeadUser(user.id)

    const existingProject = ProjectMother.create({
      id: project.id,
      userId: project.userId,
      spaceId: project.spaceId,
      communityId: project.communityId,
      leadUserId: project.leadUserId
    })

    repository.returnOnFind(existingProject)

    const space = SpaceMother.create({ communityId: project.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user, leadUser]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = UpdateProjectCommandMother.fromAggregate(project)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(project)
  })

  test('Fail if the user doesnt exists', async () => {
    const user = UserMother.random()
    const leadUser = UserMother.random()

    const project = ProjectMother.forLeadUser(user.id)

    const space = SpaceMother.create({ communityId: project.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user, leadUser]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = UpdateProjectCommandMother.fromAggregate(project)

    expect(handler.handle(command)).rejects.toThrow(ProjectNotFound)
  })

  test('Create a new ProjectUpdatedDomainEvent', async () => {
    const user = UserMother.random()
    const leadUser = UserMother.random()

    const project = ProjectMother.forLeadUser(user.id)

    const existingProject = ProjectMother.create({
      id: project.id,
      leadUserId: project.leadUserId,
      userId: project.userId,
      spaceId: project.spaceId,
      communityId: project.communityId
    })

    repository.returnOnFind(existingProject)

    const space = SpaceMother.create({ communityId: project.communityId })

    queryBus.returnOnQuery(new FindUsersByCriteriaQuery(), new UserCollectionResponse([user, leadUser]))
    queryBus.returnOnQuery(new FindSpaceByIdQuery(space.id.valueOf()), new SpaceResponse(space))

    const command = UpdateProjectCommandMother.fromAggregate(project)

    await handler.handle(command)

    const expectedEvent = ProjectUpdatedDomainEvent.fromAggregate(project)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
