import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateSubcommunityCommand } from './CreateSubcommunityCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { Name } from '@Core/Community/domain/ValueObjects/Name'
import { Slug } from '@Core/Community/domain/ValueObjects/Slug'
import { LogoUrl } from '@Core/Community/domain/ValueObjects/LogoUrl'
import { BannerUrl } from '@Core/Community/domain/ValueObjects/BannerUrl'
import { ParentId } from '@Core/Community/domain/ValueObjects/ParentId'
import { About } from '@Core/Community/domain/ValueObjects/About'

export class CreateSubcommunityCommandHandler implements CommandHandler<CreateSubcommunityCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateSubcommunityCommand
  }

  async handle (command: CreateSubcommunityCommand): Promise<void> {
    await this.creator.run({
      id: new Id(command.id),
      name: new Name(command.name),
      slug: new Slug(command.slug),
      parentId: new ParentId(command.parentId),
      about: command.about ? new About(command.about) : null,
      logoUrl: command.logoUrl ? new LogoUrl(command.logoUrl) : null,
      bannerUrl: command.bannerUrl ? new BannerUrl(command.bannerUrl) : null
    })
  }
}
