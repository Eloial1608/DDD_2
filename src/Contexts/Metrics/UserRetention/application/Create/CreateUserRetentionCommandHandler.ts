import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateUserRetentionCommand } from './CreateUserRetentionCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Metrics/UserRetention/domain/ValueObjects/Id'
import { UserId } from '@Metrics/UserRetention/domain/ValueObjects/UserId'
import { CommunityId } from '@Metrics/UserRetention/domain/ValueObjects/CommunityId'

export class CreateUserRetentionCommandHandler implements CommandHandler<CreateUserRetentionCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateUserRetentionCommand
  }

  async handle (command: CreateUserRetentionCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new UserId(command.userId),
      new CommunityId(command.communityId)
    )
  }
}
