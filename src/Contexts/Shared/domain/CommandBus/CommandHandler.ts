import { Command } from './Command'

export interface CommandHandler<C extends Command> {
    subscribedTo (): C
    handle (command: C): Promise<void>
}
