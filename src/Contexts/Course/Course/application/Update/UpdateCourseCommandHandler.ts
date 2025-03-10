import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Updater } from './Updater'
import { Command } from '@Shared/domain/CommandBus/Command'
import { UpdateCourseCommand } from './UpdateCourseCommand'
import { Id } from '@Course/Course/domain/ValueObjects/Id'
import { CommunityId } from '@Course/Course/domain/ValueObjects/CommunityId'
import { UserId } from '@Course/Course/domain/ValueObjects/UserId'
import { Title } from '@Course/Course/domain/ValueObjects/Title'
import { BannerUrl } from '@Course/Course/domain/ValueObjects/BannerUrl'
import { IsPaid } from '@Course/Course/domain/ValueObjects/IsPaid'
import { Price, PriceValue, PriceCurrency } from '@Course/Course/domain/ValueObjects/Price'
import { StartDate } from '@Course/Course/domain/ValueObjects/StartDate'
import { EndDate } from '@Course/Course/domain/ValueObjects/EndDate'
import { MaxStudents } from '@Course/Course/domain/ValueObjects/MaxStudents'

export class UpdateCourseCommandHandler implements CommandHandler<UpdateCourseCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateCourseCommand
  }

  async handle (command: UpdateCourseCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new CommunityId(command.communityId),
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
      command.maxStudents ? new MaxStudents(command.maxStudents) : null
    )
  }
}
