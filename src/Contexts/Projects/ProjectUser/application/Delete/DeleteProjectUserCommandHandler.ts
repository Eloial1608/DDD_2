import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Deleter } from './Deleter'
import { Command } from '@Shared/domain/CommandBus/Command'
import { DeleteProjectUserCommand } from './DeleteProjectUserCommand'
import { Id } from '@Projects/ProjectUser/domain/ValueObjects/Id'

export class DeleteProjectUserCommandHandler implements CommandHandler<DeleteProjectUserCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteProjectUserCommand
  }

  async handle (command: DeleteProjectUserCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id)
    )
  }
}
