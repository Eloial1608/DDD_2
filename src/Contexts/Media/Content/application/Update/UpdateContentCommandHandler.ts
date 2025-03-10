import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdateContentCommand } from './UpdateContentCommand'
import { Updater } from './Updater'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Media/Content/domain/ValueObjects/Id'
import { CommunityId } from '@Media/Content/domain/ValueObjects/CommunityId'
import { AllowedMediaTypes, Type } from '@Media/Content/domain/ValueObjects/Type'
import { Url } from '@Media/Content/domain/ValueObjects/Url'

export class UpdateContentCommandHandler implements CommandHandler<UpdateContentCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateContentCommand
  }

  async handle (command: UpdateContentCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new Type(command.type as AllowedMediaTypes),
      new Url(command.url)
    )
  }
}
