import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdateCommunitySpaceOrderedIdsCommand } from './UpdateCommunitySpaceOrderedIdsCommand'
import { Updater } from './Updater'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { SpaceOrderedIds } from '@Core/Community/domain/ValueObjects/SpaceOrderedIds'

export class UpdateCommunitySpaceOrderedIdsCommandHandler implements CommandHandler<UpdateCommunitySpaceOrderedIdsCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateCommunitySpaceOrderedIdsCommand
  }

  async handle (command: UpdateCommunitySpaceOrderedIdsCommand): Promise<void> {
    await this.updater.run({
      id: new Id(command.id),
      spaceOrderedIds: new SpaceOrderedIds(command.spaceOrderedIds)
    })
  }
}
