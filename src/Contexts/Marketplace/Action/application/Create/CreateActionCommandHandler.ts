import type { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateActionCommand } from './CreateActionCommand'
import type { Command } from '@Shared/domain/CommandBus/Command'
import type { Creator } from './Creator'
import { Id } from '@Marketplace/Action/domain/ValueObjects/Id'
import { CommunityId } from '@Marketplace/Action/domain/ValueObjects/CommunityId'
import { ProductId } from '@Marketplace/Action/domain/ValueObjects/ProductId'
import { ActionType } from '@Marketplace/Action/domain/ValueObjects/ActionType'
import { TargetId } from '@Marketplace/Action/domain/ValueObjects/TargetId'

export class CreateActionCommandHandler implements CommandHandler<CreateActionCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateActionCommand
  }

  async handle (command: CreateActionCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new ProductId(command.productId),
      new ActionType(command.type),
      command.targetId ? new TargetId(command.targetId) : null
    )
  }
}
