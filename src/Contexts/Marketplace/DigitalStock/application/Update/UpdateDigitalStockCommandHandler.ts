import type { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdateDigitalStockCommand } from './UpdateDigitalStockCommand'
import type { Command } from '@Shared/domain/CommandBus/Command'
import type { Updater } from './Updater'
import { Id } from '@Marketplace/DigitalStock/domain/ValueObjects/Id'
import { DigitalStockType } from '@Marketplace/DigitalStock/domain/ValueObjects/DigitalStockType'
import { Value } from '@Marketplace/DigitalStock/domain/ValueObjects/Value'
import { IsAvailable } from '@Marketplace/DigitalStock/domain/ValueObjects/IsAvailable'

export class UpdateDigitalStockCommandHandler implements CommandHandler<UpdateDigitalStockCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateDigitalStockCommand
  }

  async handle (command: UpdateDigitalStockCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new DigitalStockType(command.type),
      new Value(command.value),
      new IsAvailable(command.isAvailable)
    )
  }
}
