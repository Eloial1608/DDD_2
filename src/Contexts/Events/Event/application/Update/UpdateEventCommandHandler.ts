import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdateEventCommand } from './UpdateEventCommand'
import { Updater } from './Updater'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Events/Event/domain/ValueObjects/Id'
import { UserId } from '@Events/Event/domain/ValueObjects/UserId'
import { Title } from '@Events/Event/domain/ValueObjects/Title'
import { BannerUrl } from '@Events/Event/domain/ValueObjects/BannerUrl'
import { Description } from '@Events/Event/domain/ValueObjects/Description'
import { StartDate } from '@Events/Event/domain/ValueObjects/StartDate'
import { EndDate } from '@Events/Event/domain/ValueObjects/EndDate'
import { Type } from '@Events/Event/domain/ValueObjects/Type'
import { Data } from '@Events/Event/domain/ValueObjects/Data'
import { MaxOnlineMembers } from '@Events/Event/domain/ValueObjects/MaxOnlineMembers'
import { MaxOnSiteMembers } from '@Events/Event/domain/ValueObjects/MaxOnSiteMembers'
import { Location } from '@Events/Event/domain/ValueObjects/Location'

export class UpdateEventCommandHandler implements CommandHandler<UpdateEventCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateEventCommand
  }

  async handle (command: UpdateEventCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new Title(command.title),
      command.description ? new Description(command.description) : null,
      new UserId(command.userId),
      new StartDate(command.startDate),
      new EndDate(command.endDate),
      command.bannerUrl ? new BannerUrl(command.bannerUrl) : null,
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
