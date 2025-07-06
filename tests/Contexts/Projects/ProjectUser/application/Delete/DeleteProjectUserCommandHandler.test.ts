import EventBusMock from '@Tests/Contexts/Shared/infrastructure/EventBus/EventBusMock'
import { ProjectUserRepositoryMock } from '../../__mocks__/ProjectUserRepositoryMock'
import { DeleteProjectUserCommandHandler } from '@Projects/ProjectUser/application/Delete/DeleteProjectUserCommandHandler'
import { Deleter } from '@Projects/ProjectUser/application/Delete/Deleter'
import { ProjectUserMother } from '../../domain/ProjectUserMother'
import { ProjectUserDeletedDomainEvent } from '@Projects/ProjectUser/domain/Events/ProjectUserDeletedDomainEvent'

let eventBus: EventBusMock
let repository: ProjectUserRepositoryMock
let handler: DeleteProjectUserCommandHandler
let deleter: Deleter

describe('DeleteSpaceMemberOnSpaceMemberDeletedHandler should ', () => {
  beforeEach(() => {
    eventBus = new EventBusMock()
    repository = new ProjectUserRepositoryMock()
    deleter = new Deleter(repository, eventBus)
    handler = new DeleteProjectUserCommandHandler(deleter)
  })

  test('Delete ProjectUser', async () => {
    const projectUser = ProjectUserMother.random()

    repository.returnOnFind(projectUser)

    const event = ProjectUserDeletedDomainEvent.fromAggregate(projectUser)

    await handler.handle(event)

    repository.assertDeleteHasBeenCalledWith(projectUser)
  })

  test('Dont do anything if the ProjectUser doesnt exists exists', async () => {
    const projectUser = ProjectUserMother.random()

    const event = ProjectUserDeletedDomainEvent.fromAggregate(projectUser)

    await handler.handle(event)

    repository.assertDeleteHasNotBeenCalled()
  })

  test('Create a new ProjectUserDeletedDomainEvent', async () => {
    const projectUser = ProjectUserMother.random()

    repository.returnOnFind(projectUser)

    const event = ProjectUserDeletedDomainEvent.fromAggregate(projectUser)

    await handler.handle(event)

    const expectedEvent = ProjectUserDeletedDomainEvent.fromAggregate(projectUser)

    eventBus.assertEventHasBeenPublished(expectedEvent)
  })
})
