import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Updater } from './Updater'
import { Command } from '@Shared/domain/CommandBus/Command'
import { UpdateProjectCommand } from './UpdateProjectCommand'
import { Id } from '@Projects/Project/domain/ValueObjects/Id'
import { CommunityId } from '@Projects/Project/domain/ValueObjects/CommunityId'
import { UserId } from '@Projects/Project/domain/ValueObjects/UserId'
import { SpaceId } from '@Projects/Project/domain/ValueObjects/SpaceId'
import { Title } from '@Projects/Project/domain/ValueObjects/Title'
import { Description } from '@Projects/Project/domain/ValueObjects/Description'
import { BannerUrl } from '@Projects/Project/domain/ValueObjects/BannerUrl'
import { LeadUserId } from '@Projects/Project/domain/ValueObjects/LeadUserId'
import { StartDate } from '@Projects/Project/domain/ValueObjects/StartDate'

export class UpdateProjectCommandHandler implements CommandHandler<UpdateProjectCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateProjectCommand
  }

  async handle (command: UpdateProjectCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new UserId(command.userId),
      new SpaceId(command.spaceId),
      new Title(command.title),
      command.description ? new Description(command.description) : null,
      command.bannerUrl ? new BannerUrl(command.bannerUrl) : null,
      new LeadUserId(command.leadUserId),
      command.startDate ? new StartDate(command.startDate) : null,
      command.endDate ? new StartDate(command.endDate) : null
    )
  }
}
