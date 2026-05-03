import { Command } from './Command'

export interface CommandHandler<C extends Command> {
    subscribedTo (): Command
    handle (command: C): Promise<void>
}
