import { ProductRepository } from '@Marketplace/Products/domain/ProductRepository'
import { BannerUrl } from '@Marketplace/Products/domain/ValueObjects/BannerUrl'
import { Content } from '@Marketplace/Products/domain/ValueObjects/Content'
import { Id } from '@Marketplace/Products/domain/ValueObjects/Id'
import { Price } from '@Marketplace/Products/domain/ValueObjects/Price'
import { ProductMedia } from '@Marketplace/Products/domain/ValueObjects/ProductMedia'
import { Stock } from '@Marketplace/Products/domain/ValueObjects/Stock'
import { Title } from '@Marketplace/Products/domain/ValueObjects/Title'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'

export class Updater {
  constructor (
        private readonly repository: ProductRepository,
        private readonly eventBus: EventBus
  ) {}

  async run (
    id: Id,
    title: Title,
    content: Content,
    bannerUrl: Nullable<BannerUrl>,
    productMedia: ProductMedia[],
    stock: Nullable<Stock>,
    price: Price
  ) {
    const product = await this.repository.find(id)

    if (!product) return

    const updated = product.update(
      title,
      content,
      bannerUrl,
      productMedia,
      stock,
      price
    )

    await this.repository.persist(updated)

    await this.eventBus.publish(updated.pullDomainEvents())
  }
}
