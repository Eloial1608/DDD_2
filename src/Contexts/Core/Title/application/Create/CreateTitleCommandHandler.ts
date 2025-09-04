import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateTitleCommand } from './CreateTitleCommand'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Creator } from './Creator'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { Name } from '@Core/User/domain/ValueObjects/Name'
import { CommunityId } from '@Core/User/domain/ValueObjects/CommunityId'
import { TitleImageUrl } from '@Core/Title/domain/ValueObjects/TitleImageUrl'

export class CreateTitleCommandHandler implements CommandHandler<CreateTitleCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateTitleCommand
  }

  async handle (command: CreateTitleCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new Name(command.name),
      new CommunityId(command.communityId),
      command.titleImageUrl ? new TitleImageUrl(command.titleImageUrl) : null
    )
  }
}
