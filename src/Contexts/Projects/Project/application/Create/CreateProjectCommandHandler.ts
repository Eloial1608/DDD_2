import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateProjectCommand } from './CreateProjectCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Projects/Project/domain/ValueObjects/Id'
import { Title } from '@Projects/Project/domain/ValueObjects/Title'
import { Description } from '@Projects/Project/domain/ValueObjects/Description'
import { BannerUrl } from '@Projects/Project/domain/ValueObjects/BannerUrl'
import { LeadUserId } from '@Projects/Project/domain/ValueObjects/LeadUserId'
import { StartDate } from '@Projects/Project/domain/ValueObjects/StartDate'
import { EndDate } from '@Projects/Project/domain/ValueObjects/EndDate'
import { CommunityId } from '@Projects/Project/domain/ValueObjects/CommunityId'
import { SpaceId } from '@Projects/Project/domain/ValueObjects/SpaceId'
import { UserId } from '@Projects/Project/domain/ValueObjects/UserId'

export class CreateProjectCommandHandler implements CommandHandler<CreateProjectCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateProjectCommand
  }

  async handle (command: CreateProjectCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new Title(command.title),
      command.description ? new Description(command.description) : null,
      command.bannerUrl ? new BannerUrl(command.bannerUrl) : null,
      new LeadUserId(command.leadUserId),
      command.startDate ? new StartDate(command.startDate) : null,
      command.endDate ? new EndDate(command.endDate) : null,
      new CommunityId(command.communityId),
      new SpaceId(command.spaceId),
      new UserId(command.userId)
    )
  }
}
