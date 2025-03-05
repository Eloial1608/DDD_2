import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateContentCommand } from './CreateContentCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Media/Content/domain/ValueObjects/Id'
import { CommunityId } from '@Media/Content/domain/ValueObjects/CommunityId'
import { MediaId } from '@Media/Content/domain/ValueObjects/MediaId'
import { AllowedMediaTypes, Type } from '@Media/Content/domain/ValueObjects/Type'
import { Url } from '@Media/Content/domain/ValueObjects/Url'

export class CreateContentCommandHandler implements CommandHandler<CreateContentCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateContentCommand
  }

  async handle (command: CreateContentCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new MediaId(command.mediaId),
      new Type(command.type as AllowedMediaTypes),
      new Url(command.url)
    )
  }
}
