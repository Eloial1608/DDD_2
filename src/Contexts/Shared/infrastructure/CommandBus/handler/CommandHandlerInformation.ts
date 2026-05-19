import { Command } from '@Shared/domain/CommandBus/Command'
import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CommandNotRegisteredError } from '@Shared/domain/CommandBus/CommandNotRegisteredError'

export class CommandHandlerInformation {
  private readonly commandHandlersMap: Map<Command, CommandHandler<Command>>

  constructor (commandHandlers: Array<CommandHandler<Command>>) {
    this.commandHandlersMap = this.formatHandlers(commandHandlers)
  }

  private formatHandlers (handlers: Array<CommandHandler<Command>>): Map<Command, CommandHandler<Command>> {
    const map = new Map<Command, CommandHandler<Command>>()
    for (const handler of handlers) {
      if (handler.subscribedTo()) map.set(handler.subscribedTo(), handler)
    }

    return map
  }

  registerHandler (handler: CommandHandler<Command>): void {
    const command = handler.subscribedTo()
    if (command) {
      this.commandHandlersMap.set(command, handler)
    }
  }

  search (command: Command): CommandHandler<Command> {
    const handler = this.commandHandlersMap.get(command.constructor)

    if (!handler) {
      throw new CommandNotRegisteredError(command)
    }

    return handler
  }
}
