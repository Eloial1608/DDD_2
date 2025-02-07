import { Command } from '@Shared/domain/CommandBus/Command'
import { UpdateAboutAndNameCommand } from './UpdateAboutAndNameCommand'
import { UpdaterAboutAndName } from './UpdaterAboutAndName'
import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { About } from '@Core/User/domain/ValueObjects/About'
import { Name } from '@Core/User/domain/ValueObjects/Name'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { PictureUrl } from '@Core/User/domain/ValueObjects/PictureUrl'
import { BannerUrl } from '@Core/User/domain/ValueObjects/BannerUrl'
import { Username } from '@Core/User/domain/ValueObjects/Username'

export class UpdateAboutAndNameCommandHandler implements CommandHandler<UpdateAboutAndNameCommand> {
  constructor (private readonly updater: UpdaterAboutAndName) {}

  subscribedTo (): Command {
    return UpdateAboutAndNameCommand
  }

  async handle (command: UpdateAboutAndNameCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      command.about != null ? new About(command.about) : null,
      new Name(command.name),
      new Username(command.username),
      command.pictureUrl != null ? new PictureUrl(command.pictureUrl) : null,
      command.bannerUrl != null ? new BannerUrl(command.bannerUrl) : null
    )
  }
}
