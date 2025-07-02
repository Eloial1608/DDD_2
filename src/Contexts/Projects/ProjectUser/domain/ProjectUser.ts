import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { ProjectId } from './ValueObjects/ProjectId'
import { UserId } from './ValueObjects/UserId'
import { Id } from './ValueObjects/Id'

export class ProjectUser extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly userId: UserId,
        readonly projectId: ProjectId,
        readonly createdAt: CreatedAt
  ) {
    super()
  }
}
