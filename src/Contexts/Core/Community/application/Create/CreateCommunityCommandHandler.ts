import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateCommunityCommand } from './CreateCommunityCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { Name } from '@Core/Community/domain/ValueObjects/Name'
import { Suffix } from '@Core/Community/domain/ValueObjects/Suffix'
import { Color } from '@Core/Community/domain/ValueObjects/Color'
import { AllowedFeatures } from '@Core/Community/domain/ValueObjects/AllowedFeatures'
import { ExpiresAt } from '@Core/Community/domain/ValueObjects/ExpiresAt'
import { AllowedUsers } from '@Core/Community/domain/ValueObjects/AllowedUsers'
import { Slug } from '@Core/Community/domain/ValueObjects/Slug'
import { LogoUrl } from '@Core/Community/domain/ValueObjects/LogoUrl'
import { BannerUrl } from '@Core/Community/domain/ValueObjects/BannerUrl'
import { AllowedSubcommunities } from '@Core/Community/domain/ValueObjects/AllowedSubcommunities'
import { AllowsTitles } from '@Core/Community/domain/ValueObjects/AllowsTitles'

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
      logoUrl: command.logoUrl ? new LogoUrl(command.logoUrl) : null,
      bannerUrl: command.bannerUrl ? new BannerUrl(command.bannerUrl) : null,
      color: new Color(command.color),
      allowedFeatures: AllowedFeatures.fromPrimitives(command.allowedFeatures),
      expiresAt: new ExpiresAt(command.expiresAt),
      allowedUsers: new AllowedUsers(command.allowedUsers),
      allowedSubcommunities: new AllowedSubcommunities(command.allowedSubcommunities),
      allowsTitles: new AllowsTitles(command.allowsTitles)
    })
  }
}
