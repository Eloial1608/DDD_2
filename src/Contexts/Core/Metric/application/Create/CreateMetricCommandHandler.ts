import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateMetricCommand } from './CreateMetricCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateMetricCommandHandler implements CommandHandler<CreateMetricCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateMetricCommand
  }

  async handle (command: CreateMetricCommand): Promise<void> {
    await this.creator.run({
      id: command.id,
      type: command.type,
      date: command.date
    })
  }
}
