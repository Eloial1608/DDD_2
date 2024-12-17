import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateCommunityCommand } from './CreateCommunityCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { Name } from '@Core/Community/domain/ValueObjects/Name'
import { Suffix } from '@Core/Community/domain/ValueObjects/Suffix'
import { Color } from '@Core/Community/domain/ValueObjects/Color'
import { AllowedFeatures } from '@Core/Community/domain/ValueObjects/AllowedFeatures'
import { HomeSpaceId } from '@Core/Community/domain/ValueObjects/HomeSpaceId'
import { ExpiresAt } from '@Core/Community/domain/ValueObjects/ExpiresAt'
import { AllowedUsers } from '@Core/Community/domain/ValueObjects/AllowedUsers'
import { Slug } from '@Core/Community/domain/ValueObjects/Slug'
import { ParentId } from '@Core/Community/domain/ValueObjects/ParentId'
import { LogoUrl } from '@Core/Community/domain/ValueObjects/LogoUrl'
import { BannerUrl } from '@Core/Community/domain/ValueObjects/BannerUrl'

export class CreateCommunityCommandHandler implements CommandHandler<CreateCommunityCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateCommunityCommand
  }

  async handle (command: CreateCommunityCommand): Promise<void> {
    await this.creator.run({
      id: new Id(command.id),
      name: new Name(command.name),
      suffix: new Suffix(command.suffix),
      slug: new Slug(command.slug),
      parentId: command.parentId ? new ParentId(command.parentId) : null,
      logoUrl: command.logoUrl ? new LogoUrl(command.logoUrl) : null,
      bannerUrl: command.bannerUrl ? new BannerUrl(command.bannerUrl) : null,
      color: new Color(command.color),
      allowedFeatures: AllowedFeatures.fromPrimitives(command.allowedFeatures),
      homeSpaceId: new HomeSpaceId(command.homeSpaceId),
      expiresAt: new ExpiresAt(command.expiresAt),
      allowedUsers: new AllowedUsers(command.allowedUsers)
    })
  }
}
