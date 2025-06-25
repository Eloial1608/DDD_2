import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateProductCommand } from './CreateProductCommand'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Creator } from './Creator'
import { Id } from '@Marketplace/Products/domain/ValueObjects/Id'
import { CommunityId } from '@Marketplace/Products/domain/ValueObjects/CommunityId'
import { SpaceId } from '@Marketplace/Products/domain/ValueObjects/SpaceId'
import { Title } from '@Marketplace/Products/domain/ValueObjects/Title'
import { UserId } from '@Marketplace/Products/domain/ValueObjects/UserId'
import { Content } from '@Marketplace/Products/domain/ValueObjects/Content'
import { BannerUrl } from '@Marketplace/Products/domain/ValueObjects/BannerUrl'
import { ProductMedia } from '@Marketplace/Products/domain/ValueObjects/ProductMedia'
import { Type } from '@Marketplace/Products/domain/ValueObjects/Type'
import { Stock } from '@Marketplace/Products/domain/ValueObjects/Stock'
import { Price, PriceCurrency, PriceValue } from '@Marketplace/Products/domain/ValueObjects/Price'

export class CreateProductCommandHandler implements CommandHandler<CreateProductCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateProductCommand
  }

  async handle (command: CreateProductCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new CommunityId(command.communityId),
      new SpaceId(command.spaceId),
      new Title(command.title),
      new UserId(command.userId),
      new Content(command.content),
      command.bannerUrl ? new BannerUrl(command.bannerUrl) : null,
      command.productMedia.map(x => ProductMedia.fromPrimitives(x.id, x.mediaUrl, x.mediaType)),
      new Type(command.type),
      command.stock ? new Stock(command.stock) : null,
      new Price(
        new PriceValue(command.price?.value),
        new PriceCurrency(command.price?.currency)
      )
    )
  }
}
