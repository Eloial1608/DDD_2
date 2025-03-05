import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateThreadCommand } from './CreateThreadCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Threads/Thread/domain/ValueObjects/Id'
import { CommunityId } from '@Threads/Thread/domain/ValueObjects/CommunityId'
import { SpaceId } from '@Threads/Thread/domain/ValueObjects/SpaceId'
import { Title } from '@Threads/Thread/domain/ValueObjects/Title'
import { ParentThreadId } from '@Threads/Thread/domain/ValueObjects/ParentThreadId'
import { UserId } from '@Threads/Thread/domain/ValueObjects/UserId'
import { Content } from '@Threads/Thread/domain/ValueObjects/Content'
import { BannerUrl } from '@Threads/Thread/domain/ValueObjects/BannerUrl'
import { IsPaid } from '@Threads/Thread/domain/ValueObjects/IsPaid'
import { Price, PriceCurrency, PriceValue } from '@Threads/Thread/domain/ValueObjects/Price'

export class CreateThreadCommandHandler implements CommandHandler<CreateThreadCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateThreadCommand
  }

  async handle (command: CreateThreadCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new SpaceId(command.spaceId),
      new Title(command.title),
      command.parentThreadId ? new ParentThreadId(command.parentThreadId) : null,
      new UserId(command.userId),
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
