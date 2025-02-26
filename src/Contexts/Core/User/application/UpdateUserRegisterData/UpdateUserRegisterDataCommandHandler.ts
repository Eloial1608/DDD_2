import { Command } from '@Shared/domain/CommandBus/Command'
import { UpdateUserRegisterDataCommand } from './UpdateUserRegisterDataCommand'
import { UpdaterUserRegisterData } from './UpdaterUserRegisterData'
import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { RegisterData } from '@Core/User/domain/ValueObjects/RegisterData'

export class UpdateUserRegisterDataCommandHandler implements CommandHandler<UpdateUserRegisterDataCommand> {
  constructor (private readonly updater: UpdaterUserRegisterData) {}

  subscribedTo (): Command {
    return UpdateUserRegisterDataCommand
  }

  async handle (command: UpdateUserRegisterDataCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new RegisterData(command.registerData)
    )
  }
}
