import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdatePostCommand } from './UpdatePostCommand'
import { Updater } from './Updater'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Posts/Post/domain/ValueObjects/Id'
import { CommunityId } from '@Posts/Post/domain/ValueObjects/CommunityId'
import { UserId } from '@Posts/Post/domain/ValueObjects/UserId'
import { Title } from '@Posts/Post/domain/ValueObjects/Title'
import { Content } from '@Posts/Post/domain/ValueObjects/Content'
import { BannerUrl } from '@Posts/Post/domain/ValueObjects/BannerUrl'
import { IsPaid } from '@Posts/Post/domain/ValueObjects/IsPaid'
import { Price, PriceCurrency, PriceValue } from '@Posts/Post/domain/ValueObjects/Price'

export class UpdatePostCommandHandler implements CommandHandler<UpdatePostCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdatePostCommand
  }

  async handle (command: UpdatePostCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new UserId(command.userId),
      new Title(command.title),
      new Content(command.content),
      command.bannerUrl ? new BannerUrl(command.bannerUrl) : null,
      new IsPaid(command.isPaid),
      command.price
        ? new Price(
          new PriceValue(command.price.value),
          new PriceCurrency(command.price.currency)
        )
        : null
    )
  }
}
