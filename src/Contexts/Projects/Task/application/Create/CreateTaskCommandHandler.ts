import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateTaskCommand } from './CreateTaskCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Projects/Task/domain/ValueObjects/Id'
import { UserId } from '@Projects/Task/domain/ValueObjects/UserId'
import { Title } from '@Projects/Task/domain/ValueObjects/Title'
import { Description } from '@Projects/Task/domain/ValueObjects/Description'
import { Priority } from '@Projects/Task/domain/ValueObjects/Priority'
import { TaskStatus } from '@Projects/Task/domain/ValueObjects/TaskStatus'
import { TaskTypes } from '@Projects/Task/domain/ValueObjects/TaskTypes'
import { Deadline } from '@Projects/Task/domain/ValueObjects/Deadline'
import { Points } from '@Projects/Task/domain/ValueObjects/Points'
import { ProjectId } from '@Projects/Task/domain/ValueObjects/ProjectId'
import { CommunityId } from '@Projects/Task/domain/ValueObjects/CommunityId'
import { DeletedAt } from '@Projects/Task/domain/ValueObjects/DeletedAt'

export class CreateTaskCommandHandler implements CommandHandler<CreateTaskCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateTaskCommand
  }

  async handle (command: CreateTaskCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new Title(command.title),
      command.description ? new Description(command.description) : null,
      command.assignedUserId ? new UserId(command.assignedUserId) : null,
      command.priority ? new Priority(command.priority) : null,
      command.status ? new TaskStatus(command.status) : null,
      command.type ? new TaskTypes(command.type) : null,
      command.deadline ? new Deadline(command.deadline) : null,
      command.points ? new Points(command.points) : null,
      new ProjectId(command.projectId),
      new CommunityId(command.communityId),
      command.deletedAt ? new DeletedAt(command.deletedAt) : null
    )
  }
}
