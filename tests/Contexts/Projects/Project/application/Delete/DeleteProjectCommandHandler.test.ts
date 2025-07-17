import { DeleteProjectCommandHandler } from '@Projects/Project/application/Delete/DeleteProjectCommandHandler'
import { Deleter } from '@Projects/Project/application/Delete/Deleter'
import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { ProjectRepositoryMock } from '../../__mocks__/ProjectRepositoryMock'
import { ProjectMother } from '../../domain/ProjectMother'
import { DeleteProjectCommandMother } from './DeleteProjectCommandMother'
import { ProjectDeletedDomainEvent } from '@Projects/Project/domain/Events/ProjectDeletedDomainEvent'
import { DeletedAt } from '@Projects/Project/domain/ValueObjects/DeletedAt'

let eventBus: EventBusMock
let repository: ProjectRepositoryMock
let handler: DeleteProjectCommandHandler
let deleter: Deleter

describe('DeleteProjectCommandHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new ProjectRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteProjectCommandHandler(deleter)
  })

  test('Delete a project', async () => {
    const project = ProjectMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = ProjectMother.create({ ...project, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteProjectCommandMother.fromAggregate(project)

    await handler.handle(command)

    repository.assertPersistHasBeenCalledWith(project)
  })

  test('Create a new ProjectDeletedDomainEvent', async () => {
    const project = ProjectMother.create({ deletedAt: new DeletedAt(new Date()) })

    const existing = ProjectMother.create({ ...project, deletedAt: undefined })

    repository.returnOnFind(existing)

    const command = DeleteProjectCommandMother.fromAggregate(project)

    await handler.handle(command)

    const expectedEvent = ProjectDeletedDomainEvent.fromAggregate(project)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
