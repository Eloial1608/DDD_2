import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/UserTitle/domain/ValueObjects/Id'
import { CreateUserTitleCommand } from './CreateUserTitleCommand'
import { CommunityId } from '@Core/UserTitle/domain/ValueObjects/CommunityId'
import { TitleId } from '@Core/UserTitle/domain/ValueObjects/TitleId'
import { UserId } from '@Core/UserTitle/domain/ValueObjects/UserId'

export class CreateUserTitleCommandHandler implements CommandHandler<CreateUserTitleCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateUserTitleCommand
  }

  async handle (command: CreateUserTitleCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new TitleId(command.titleId),
      new UserId(command.userId)
    )
  }
}
