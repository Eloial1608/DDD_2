import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdateProductCommand } from './UpdateProductCommand'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Updater } from './Updater'
import { Id } from '@Marketplace/Products/domain/ValueObjects/Id'
import { Title } from '@Marketplace/Products/domain/ValueObjects/Title'
import { Content } from '@Marketplace/Products/domain/ValueObjects/Content'
import { BannerUrl } from '@Marketplace/Products/domain/ValueObjects/BannerUrl'
import { ProductMedia } from '@Marketplace/Products/domain/ValueObjects/ProductMedia'
import { Stock } from '@Marketplace/Products/domain/ValueObjects/Stock'
import { Price, PriceCurrency, PriceValue } from '@Marketplace/Products/domain/ValueObjects/Price'

export class UpdateProductCommandHandler implements CommandHandler<UpdateProductCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateProductCommand
  }

  async handle (command: UpdateProductCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new Title(command.title),
      new Content(command.content),
      command.bannerUrl ? new BannerUrl(command.bannerUrl) : null,
      command.productMedia.map(x => ProductMedia.fromPrimitives(x.id, x.mediaUrl, x.mediaType)),
      command.stock ? new Stock(command.stock) : null,
      new Price(
        new PriceValue(command.price?.value),
        new PriceCurrency(command.price?.currency)
      )
    )
  }
}
