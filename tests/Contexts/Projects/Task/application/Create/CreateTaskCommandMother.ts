import { CreateTaskCommand } from '@Projects/Task/application/Create/CreateTaskCommand'
import { Task } from '@Projects/Task/domain/Task'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateTaskCommandMother {
  static create (
    id: string,
    title: string,
    description: Nullable<string>,
    assignedUserId: Nullable<string>,
    priority: Nullable<number>,
    status: Nullable<string>,
    type: Nullable<string>,
    deadline: Nullable<Date>,
    points: Nullable<number>,
    projectId: string,
    communityId: string,
    deletedAt: Nullable<Date>
  ): CreateTaskCommand {
    return new CreateTaskCommand(
      id,
      title,
      description,
      assignedUserId,
      priority,
      status,
      type,
      deadline,
      points,
      projectId,
      communityId,
      deletedAt
    )
  }

  static fromAggregate (task: Task): CreateTaskCommand {
    return this.create(
      task.id.valueOf(),
      task.title.valueOf(),
      task.description ? task.description.valueOf() : null,
      task.assignedUserId ? task.assignedUserId.valueOf() : null,
      task.priority ? task.priority.valueOf() : null,
      task.status ? task.status.valueOf() : null,
      task.type ? task.type.valueOf() : null,
      task.deadline ? task.deadline.valueOf() : null,
      task.points ? task.points.valueOf() : null,
      task.projectId.valueOf(),
      task.communityId.valueOf(),
      task.deletedAt ? task.deletedAt.valueOf() : null
    )
  }
}
