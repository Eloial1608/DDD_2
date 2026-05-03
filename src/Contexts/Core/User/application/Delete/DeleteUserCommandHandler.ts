import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { DeleteUserCommand } from './DeleteUserCommand'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Deleter } from './Deleter'
import { Id } from '@Core/User/domain/ValueObjects/Id'

export class DeleteUserCommandHandler implements CommandHandler<DeleteUserCommand> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): Command {
    return DeleteUserCommand
  }

  async handle (command: DeleteUserCommand): Promise<void> {
    await this.deleter.run(
      new Id(command.id)
    )
  }
}
