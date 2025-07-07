import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { ProjectId } from './ValueObjects/ProjectId'
import { UserId } from './ValueObjects/UserId'
import { Id } from './ValueObjects/Id'
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
