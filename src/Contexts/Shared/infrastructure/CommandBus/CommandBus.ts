import { CommandBus as ICommandBus } from '@Shared/domain/CommandBus/CommandBus.js'
import { CommandHandlerInformationMap } from '../../domain/CommandBus/CommandHandlerInformationMap'
import { Command } from '@Shared/domain/CommandBus/Command.js'

export class CommandBus implements ICommandBus {
  constructor (private readonly commandInformationHandler: CommandHandlerInformationMap) {}

  async dispatch (command: Command): Promise<void> {
    return await this.commandInformationHandler.search(command).handle(command)
  }
}
