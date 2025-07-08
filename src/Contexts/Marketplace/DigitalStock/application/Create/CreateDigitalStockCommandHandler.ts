import type { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateDigitalStockCommand } from './CreateDigitalStockCommand'
import type { Command } from '@Shared/domain/CommandBus/Command'
import type { Creator } from './Creator'
import { Id } from '@Marketplace/DigitalStock/domain/ValueObjects/Id'
import { CommunityId } from '@Marketplace/DigitalStock/domain/ValueObjects/CommunityId'
import { ProductId } from '@Marketplace/DigitalStock/domain/ValueObjects/ProductId'
import { DigitalStockType } from '@Marketplace/DigitalStock/domain/ValueObjects/DigitalStockType'
import { Value } from '@Marketplace/DigitalStock/domain/ValueObjects/Value'
import { IsAvailable } from '@Marketplace/DigitalStock/domain/ValueObjects/IsAvailable'

export class CreateDigitalStockCommandHandler implements CommandHandler<CreateDigitalStockCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateDigitalStockCommand
  }

  async handle (command: CreateDigitalStockCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new ProductId(command.productId),
      new DigitalStockType(command.type),
      new Value(command.value),
      new IsAvailable(command.isAvailable)
    )
  }
}
