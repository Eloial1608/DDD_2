import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Author } from './ValueObjects/Author'
import { BannerUrl } from './ValueObjects/BannerUrl'
import { CommunityId } from './ValueObjects/CommunityId'
import { Content } from './ValueObjects/Content'
import { Id } from './ValueObjects/Id'
import { SpaceId } from './ValueObjects/SpaceId'
import { Stock } from './ValueObjects/Stock'
import { Title } from './ValueObjects/Title'
import { UserId } from './ValueObjects/UserId'
import { Price } from './ValueObjects/Price'
import { TotalRatings } from './ValueObjects/TotalRatings'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { Nullable } from '@Shared/domain/Nullable'
import { Type } from './ValueObjects/Type'
import { ProductMedia } from './ValueObjects/ProductMedia'
import { ProductCreatedDomainEvent } from './Events/ProductCreatedDomainEvent'
import { ProductUpdatedDomainEvent } from './Events/ProductUpdatedDomainEvent'

export class Product extends AggregateRoot {
  constructor (
    readonly id: Id,
    readonly communityId: CommunityId,
    readonly spaceId: SpaceId,
    readonly title: Title,
    readonly userId: UserId,
    readonly content: Content,
    readonly bannerUrl: Nullable<BannerUrl>,
    readonly productMedia: ProductMedia[],
    readonly type: Type,
    readonly stock: Nullable<Stock>,
    readonly author: Author,
    readonly price: Price,
    readonly totalRatings: TotalRatings,
    readonly createdAt: CreatedAt,
    readonly updatedAt: UpdatedAt,
    readonly deletedAt: Nullable<DeletedAt>
  ) {
    super()
  }

  static create (
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
    author: Author,
    price: Price
  ) {
    const product = new Product(
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
      author,
      price,
      new TotalRatings(0),
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
      null
    )

    product.record(ProductCreatedDomainEvent.fromAggregate(product))

    return product
  }

  update (
    title: Title,
    content: Content,
    bannerUrl: Nullable<BannerUrl>,
    productMedia: ProductMedia[],
    stock: Nullable<Stock>,
    price: Price
  ) {
    const product = new Product(
      this.id,
      this.communityId,
      this.spaceId,
      title,
      this.userId,
      content,
      bannerUrl,
      productMedia,
      this.type,
      stock,
      this.author,
      price,
      this.totalRatings,
      this.createdAt,
      new UpdatedAt(new Date()),
      null
    )

    product.record(ProductUpdatedDomainEvent.fromAggregate(product))

    return product
  }
}
