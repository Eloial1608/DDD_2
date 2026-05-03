import { Command } from './Command'
import { CommandHandler } from './CommandHandler'

export interface CommandHandlerInformationMap {
    search (command: Command): CommandHandler<Command>
}
