import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateMediaCommand } from './CreateMediaCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Media/Media/domain/ValueObjects/Id'
import { CommunityId } from '@Media/Media/domain/ValueObjects/CommunityId'
import { UserId } from '@Media/Media/domain/ValueObjects/UserId'
import { Title } from '@Media/Media/domain/ValueObjects/Title'
import { BannerUrl } from '@Media/Media/domain/ValueObjects/BannerUrl'
import { IsPaid } from '@Media/Media/domain/ValueObjects/IsPaid'
import { Price, PriceCurrency, PriceValue } from '@Media/Media/domain/ValueObjects/Price'
import { SpaceId } from '@Media/Media/domain/ValueObjects/SpaceId'

export class CreateMediaCommandHandler implements CommandHandler<CreateMediaCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateMediaCommand
  }

  async handle (command: CreateMediaCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new UserId(command.userId),
      new SpaceId(command.spaceId),
      new Title(command.title),
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
