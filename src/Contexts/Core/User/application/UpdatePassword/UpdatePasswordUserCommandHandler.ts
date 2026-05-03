import { Id } from "@Core/User/domain/ValueObjects/Id"
import { Password } from "@Core/User/domain/ValueObjects/Password"
import { Command } from "@Shared/domain/CommandBus/Command"
import { CommandHandler } from "@Shared/domain/CommandBus/CommandHandler"
import { UpdatePasswordCommand } from "./UpdatePasswordCommand"
import { UpdatePassword } from "./UpdatePassword"

export class UpdatePasswordUserCommandHandler implements CommandHandler<UpdatePasswordCommand> {
  constructor (private readonly updater: UpdatePassword) {}

  subscribedTo (): Command {
    return UpdatePasswordCommand
  }

  async handle (command: UpdatePasswordCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new Password(command.password)
    )
  }
}