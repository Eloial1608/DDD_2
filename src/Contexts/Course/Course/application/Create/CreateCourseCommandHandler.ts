import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { CreateCourseCommand } from './CreateCourseCommand'
import { Id } from '@Course/Course/domain/ValueObjects/Id'
import { CommunityId } from '@Course/Course/domain/ValueObjects/CommunityId'
import { SpaceId } from '@Course/Course/domain/ValueObjects/SpaceId'
import { StartDate } from '@Course/Course/domain/ValueObjects/StartDate'
import { EndDate } from '@Course/Course/domain/ValueObjects/EndDate'
import { MaxStudents } from '@Course/Course/domain/ValueObjects/MaxStudents'
import { UserId } from '@Course/Course/domain/ValueObjects/UserId'
import { Title } from '@Course/Course/domain/ValueObjects/Title'
import { BannerUrl } from '@Course/Course/domain/ValueObjects/BannerUrl'
import { IsPaid } from '@Course/Course/domain/ValueObjects/IsPaid'
import { Price, PriceCurrency, PriceValue } from '@Course/Course/domain/ValueObjects/Price'

export class CreateCourseCommandHandler implements CommandHandler<CreateCourseCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateCourseCommand
  }

  async handle (command: CreateCourseCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new SpaceId(command.spaceId),
      new UserId(command.userId),
      new Title(command.title),
      command.bannerUrl ? new BannerUrl(command.bannerUrl) : null,
      new IsPaid(command.isPaid),
      command.price
        ? new Price(
          new PriceValue(command.price.value),
          new PriceCurrency(command.price.currency)
        )
        : null,
      new StartDate(command.startDate),
      command.endDate ? new EndDate(command.endDate) : null,
      new MaxStudents(command.maxStudents)
    )
  }
}
