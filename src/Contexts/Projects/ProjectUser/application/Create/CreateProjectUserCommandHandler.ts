import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Threads/Thread/domain/ValueObjects/Id'
import { UserId } from '@Threads/Thread/domain/ValueObjects/UserId'
import { ProjectId } from '@Projects/ProjectUser/domain/ValueObjects/ProjectId'
import { CreateProjectUserCommand } from './CreateProjectUserCommand'

export class CreateProjectUserCommandHandler implements CommandHandler<CreateProjectUserCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateProjectUserCommand
  }

  async handle (command: CreateProjectUserCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new UserId(command.userId),
      new ProjectId(command.projectId)
    )
  }
}
