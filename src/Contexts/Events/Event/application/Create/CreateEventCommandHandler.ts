import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateEventCommand } from './CreateEventCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Events/Event/domain/ValueObjects/Id'
import { CommunityId } from '@Events/Event/domain/ValueObjects/CommunityId'
import { UserId } from '@Events/Event/domain/ValueObjects/UserId'
import { Title } from '@Events/Event/domain/ValueObjects/Title'
import { BannerUrl } from '@Events/Event/domain/ValueObjects/BannerUrl'
import { IsPaid } from '@Events/Event/domain/ValueObjects/IsPaid'
import { SpaceId } from '@Events/Event/domain/ValueObjects/SpaceId'
import { Description } from '@Events/Event/domain/ValueObjects/Description'
import { StartDate } from '@Events/Event/domain/ValueObjects/StartDate'
import { EndDate } from '@Events/Event/domain/ValueObjects/EndDate'
import { IsPrivate } from '@Events/Event/domain/ValueObjects/IsPrivate'
import { Type } from '@Events/Event/domain/ValueObjects/Type'
import { Data } from '@Events/Event/domain/ValueObjects/Data'
import { MaxOnlineMembers } from '@Events/Event/domain/ValueObjects/MaxOnlineMembers'
import { MaxOnSiteMembers } from '@Events/Event/domain/ValueObjects/MaxOnSiteMembers'
import { Location } from '@Events/Event/domain/ValueObjects/Location'
import { Accessibility } from '@Events/Event/domain/ValueObjects/Accessibility'

export class CreateEventCommandHandler implements CommandHandler<CreateEventCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateEventCommand
  }

  async handle (command: CreateEventCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new SpaceId(command.spaceId),
      new Title(command.title),
      command.description ? new Description(command.description) : null,
      new UserId(command.userId),
      new StartDate(command.startDate),
      new EndDate(command.endDate),
      new IsPrivate(command.isPrivate),
      new Accessibility(command.accessibility),
      command.bannerUrl ? new BannerUrl(command.bannerUrl) : null,
      new IsPaid(command.isPaid),
      new Type(command.type),
      command.data
        ? new Data(
          command.data.url,
          command.data.platform
        )
        : null,
      command.maxOnlineMembers ? new MaxOnlineMembers(command.maxOnlineMembers) : null,
      new MaxOnSiteMembers(command.maxOnSiteMembers),
      command.location ? new Location(command.location) : null
    )
  }
}
