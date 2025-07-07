import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { ProjectId } from './ValueObjects/ProjectId'
import { UserId } from './ValueObjects/UserId'
import { Id } from './ValueObjects/Id'
import { ProjectUserCreatedDomainEvent } from './Events/ProjectUserCreatedDomainEvent'
import { ProjectUserDeletedDomainEvent } from './Events/ProjectUserDeletedDomainEvent'

export class ProjectUser extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly userId: UserId,
        readonly projectId: ProjectId,
        readonly createdAt: CreatedAt
  ) {
    super()
  }

  static create (
    id: Id,
    userId: UserId,
    projectId: ProjectId
  ): ProjectUser {
    const projectUser = new ProjectUser(
      id,
      userId,
      projectId,
      new CreatedAt(new Date())
    )

    projectUser.record(ProjectUserCreatedDomainEvent.fromAggregate(projectUser))

    return projectUser
  }

  delete (): ProjectUser {
    const projectUser = new ProjectUser(
      this.id,
      this.userId,
      this.projectId,
      this.createdAt
    )

    projectUser.record(ProjectUserDeletedDomainEvent.fromAggregate(projectUser))

    return projectUser
  }
}
