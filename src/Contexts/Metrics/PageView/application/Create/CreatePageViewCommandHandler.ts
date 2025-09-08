import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreatePageViewCommand } from './CreatePageViewCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Metrics/PageView/domain/ValueObjects/Id'
import { CommunityId } from '@Metrics/PageView/domain/ValueObjects/CommunityId'
import { UserId } from '@Metrics/PageView/domain/ValueObjects/UserId'
import { SpaceID } from '@Metrics/PageView/domain/ValueObjects/SpaceId'

export class CreatePageViewCommandHandler implements CommandHandler<CreatePageViewCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreatePageViewCommand
  }

  async handle (command: CreatePageViewCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new UserId(command.userId),
      new SpaceID(command.spaceId)
    )
  }
}
