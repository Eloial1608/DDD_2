import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdateCommunityCommand } from './UpdateCommunityCommand'
import { Updater } from './Updater'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/Community/domain/ValueObjects/Id'
import { Name } from '@Core/Community/domain/ValueObjects/Name'
import { Suffix } from '@Core/Community/domain/ValueObjects/Suffix'
import { Color } from '@Core/Community/domain/ValueObjects/Color'
import { Slug } from '@Core/Community/domain/ValueObjects/Slug'
import { LogoUrl } from '@Core/Community/domain/ValueObjects/LogoUrl'
import { BannerUrl } from '@Core/Community/domain/ValueObjects/BannerUrl'
import { Domain } from '@Core/Community/domain/ValueObjects/Domain'
import { About } from '@Core/Community/domain/ValueObjects/About'
import { IsPrivate } from '@Core/Community/domain/ValueObjects/IsPrivate'
import { IsRegisterOpen } from '@Core/Community/domain/ValueObjects/IsRegisterOpen'

export class UpdateCommunityCommandHandler implements CommandHandler<UpdateCommunityCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateCommunityCommand
  }

  async handle (command: UpdateCommunityCommand): Promise<void> {
    await this.updater.run({
      id: new Id(command.id),
      name: new Name(command.name),
      suffix: new Suffix(command.suffix),
      slug: new Slug(command.slug),
      domain: command.domain ? new Domain(command.domain) : null,
      about: command.about ? new About(command.about) : null,
      isPrivate: new IsPrivate(command.isPrivate),
      isRegisterOpen: new IsRegisterOpen(command.isRegisterOpen),
      logoUrl: command.logoUrl ? new LogoUrl(command.logoUrl) : null,
      bannerUrl: command.bannerUrl ? new BannerUrl(command.bannerUrl) : null,
      color: new Color(command.color)
    })
  }
}
