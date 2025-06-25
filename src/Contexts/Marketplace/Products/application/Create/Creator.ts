import { Product } from '@Marketplace/Products/domain/Product'
import { ProductRepository } from '@Marketplace/Products/domain/ProductRepository'
import { Author } from '@Marketplace/Products/domain/ValueObjects/Author'
import { BannerUrl } from '@Marketplace/Products/domain/ValueObjects/BannerUrl'
import { CommunityId } from '@Marketplace/Products/domain/ValueObjects/CommunityId'
import { Content } from '@Marketplace/Products/domain/ValueObjects/Content'
import { Id } from '@Marketplace/Products/domain/ValueObjects/Id'
import { Price } from '@Marketplace/Products/domain/ValueObjects/Price'
import { ProductMedia } from '@Marketplace/Products/domain/ValueObjects/ProductMedia'
import { SpaceId } from '@Marketplace/Products/domain/ValueObjects/SpaceId'
import { Stock } from '@Marketplace/Products/domain/ValueObjects/Stock'
import { Title } from '@Marketplace/Products/domain/ValueObjects/Title'
import { Type } from '@Marketplace/Products/domain/ValueObjects/Type'
import { UserId } from '@Marketplace/Products/domain/ValueObjects/UserId'
import { FindUsersByCriteriaQuery } from '@Marketplace/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Marketplace/User/application/UserCollectionResponse'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'

export class Creator {
  constructor (
        private readonly repository: ProductRepository,
        private readonly eventBus: EventBus,
        private readonly queryBus: QueryBus
  ) {}

  async run (
    id: Id,
    communityId: CommunityId,
    spaceId: SpaceId,
    title: Title,
    userId: UserId,
    content: Content,
    bannerUrl: Nullable<BannerUrl>,
    productMedia: ProductMedia[],
    type: Type,
    stock: Nullable<Stock>,
    price: Price
  ) {
    const product = await this.repository.find(id)

    if (product) return

    const user = await this.findUserByIdAndCommunityId(userId, communityId)

    if (!user) return

    const created = Product.create(
      id,
      communityId,
      spaceId,
      title,
      userId,
      content,
      bannerUrl,
      productMedia,
      type,
      stock,
      new Author(
        user.id,
        user.mainId,
        user.name,
        user.username,
        user.pictureUrl,
        user.bannerUrl
      ),
      price
    )

    await this.repository.persist(created)

    await this.eventBus.publish(created.pullDomainEvents())
  }

  private async findUserByIdAndCommunityId (id: UserId, communityId: CommunityId) {
    const userQuery = new FindUsersByCriteriaQuery([
      new Map<string, string>([
        ['field', 'id'],
        ['operator', '='],
        ['value', id.valueOf()]
      ]),
      new Map<string, string>([
        ['field', 'communityId'],
        ['operator', '='],
        ['value', communityId.valueOf()]
      ])
    ])

    return (await this.queryBus.ask<UserCollectionResponse>(userQuery)).response.pop()
  }
}
