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
import { ProductMediaType } from './ValueObjects/ProductMediaType'

export class Product extends AggregateRoot {
  constructor (
    readonly id: Id,
    readonly communityId: CommunityId,
    readonly spaceId: SpaceId,
    readonly title: Title,
    readonly userId: UserId,
    readonly content: Content,
    readonly bannerUrl: Nullable<BannerUrl>,
    readonly associatedMedia: ProductMediaType[],
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
}
