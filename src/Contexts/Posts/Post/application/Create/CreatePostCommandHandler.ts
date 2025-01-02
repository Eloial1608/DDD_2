import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreatePostCommand } from './CreatePostCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Posts/Post/domain/ValueObjects/Id'
import { CommunityId } from '@Posts/Post/domain/ValueObjects/CommunityId'
import { UserId } from '@Posts/Post/domain/ValueObjects/UserId'
import { Title } from '@Posts/Post/domain/ValueObjects/Title'
import { Content } from '@Posts/Post/domain/ValueObjects/Content'
import { BannerUrl } from '@Posts/Post/domain/ValueObjects/BannerUrl'
import { IsPaid } from '@Posts/Post/domain/ValueObjects/IsPaid'
import { Price, PriceCurrency, PriceValue } from '@Posts/Post/domain/ValueObjects/Price'
import { SpaceId } from '@Posts/Post/domain/ValueObjects/SpaceId'

export class CreatePostCommandHandler implements CommandHandler<CreatePostCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreatePostCommand
  }

  async handle (command: CreatePostCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new UserId(command.userId),
      new SpaceId(command.spaceId),
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
