import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdateTitleCommand } from './UpdateTitleCommand'
import { Updater } from './Updater'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Title/domain/ValueObjects/Id'
import { Name } from '@Core/Title/domain/ValueObjects/Name'
import { CommunityId } from '@Core/Title/domain/ValueObjects/CommunityId'
import { TitleImageUrl } from '@Core/Title/domain/ValueObjects/TitleImageUrl'

export class UpdateTitleCommandHandler implements CommandHandler<UpdateTitleCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateTitleCommand
  }

  async handle (command: UpdateTitleCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new Name(command.name),
      new CommunityId(command.communityId),
      command.titleImageUrl ? new TitleImageUrl(command.titleImageUrl) : null
    )
  }
}
