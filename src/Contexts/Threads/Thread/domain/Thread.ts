import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { CommunityId } from './ValueObjects/CommunityId'
import { SpaceId } from './ValueObjects/SpaceId'
import { Title } from './ValueObjects/Title'
import { ParentThreadId } from './ValueObjects/ParentThreadId'
import { UserId } from './ValueObjects/UserId'
import { Content } from './ValueObjects/Content'
import { BannerUrl } from './ValueObjects/BannerUrl'
import { Author } from './ValueObjects/Author'
import { IsPaid } from './ValueObjects/IsPaid'
import { Price } from './ValueObjects/Price'
import { TotalLikes } from './ValueObjects/TotalLikes'
import { TotalThreads } from './ValueObjects/TotalThreads'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { Nullable } from '@Shared/domain/Nullable'

export class Thread extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly communityId: CommunityId,
        readonly spaceId: SpaceId,
        readonly title: Title,
        readonly parentThreadId: Nullable<ParentThreadId>,
        readonly userId: UserId,
        readonly content: Content,
        readonly bannerUrl: Nullable<BannerUrl>,
        readonly author: Author,
        readonly isPaid: IsPaid,
        readonly price: Nullable<Price>,
        readonly totalLikes: TotalLikes,
        readonly totalThreads: TotalThreads,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt,
        readonly deletedAt: Nullable<DeletedAt>
  ) {
    super()
  }
}
