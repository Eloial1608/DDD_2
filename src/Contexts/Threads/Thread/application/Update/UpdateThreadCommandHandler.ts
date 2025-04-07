import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdateThreadCommand } from './UpdateThreadCommand'
import { Updater } from './Updater'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Threads/Thread/domain/ValueObjects/Id'
import { CommunityId } from '@Threads/Thread/domain/ValueObjects/CommunityId'
import { UserId } from '@Threads/Thread/domain/ValueObjects/UserId'
import { Title } from '@Threads/Thread/domain/ValueObjects/Title'
import { Content } from '@Threads/Thread/domain/ValueObjects/Content'
import { BannerUrl } from '@Threads/Thread/domain/ValueObjects/BannerUrl'
import { IsPaid } from '@Threads/Thread/domain/ValueObjects/IsPaid'
import { Price, PriceCurrency, PriceValue } from '@Threads/Thread/domain/ValueObjects/Price'
import { SpaceId } from '@Threads/Thread/domain/ValueObjects/SpaceId'
import { ParentThreadId } from '@Threads/Thread/domain/ValueObjects/ParentThreadId'

export class UpdateThreadCommandHandler implements CommandHandler<UpdateThreadCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateThreadCommand
  }

  async handle (command: UpdateThreadCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new UserId(command.userId),
      new SpaceId(command.spaceId),
      command.title ? new Title(command.title) : null,
      command.parentThreadId ? new ParentThreadId(command.parentThreadId): null,
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
