import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { CommunityId } from './ValueObjects/CommunityId'
import { UserId } from './ValueObjects/UserId'
import { Title } from './ValueObjects/Title'
import { Nullable } from '@Shared/domain/Nullable'
import { BannerUrl } from './ValueObjects/BannerUrl'
import { Author } from './ValueObjects/Author'
import { IsPaid } from './ValueObjects/IsPaid'
import { Price } from './ValueObjects/Price'
import { TotalLikes } from './ValueObjects/TotalLikes'
import { TotalComments } from './ValueObjects/TotalComments'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { MediaCreatedDomainEvent } from './Events/MediaCreatedDomainEvent'
import { MediaUpdatedDomainEvent } from './Events/MediaUpdatedDomainEvent'
import { MediaDeletedDomainEvent } from './Events/MediaDeletedDomainEvent'
import { SpaceId } from './ValueObjects/SpaceId'
import { MediaTotalLikesUpdatedDomainEvent } from './Events/MediaTotalLikesUpdatedDomainEvent'
import { MediaTotalCommentsUpdatedDomainEvent } from './Events/MediaTotalCommentsUpdatedDomainEvent'
import { MediaAuthorUpdatedDomainEvent } from './Events/MediaAuthorUpdatedDomainEvent'

export class Media extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly communityId: CommunityId,
        readonly userId: UserId,
        readonly spaceId: SpaceId,
        readonly title: Title,
        readonly bannerUrl: Nullable<BannerUrl>,
        readonly author: Author,
        readonly isPaid: IsPaid,
        readonly price: Nullable<Price>,
        readonly totalLikes: TotalLikes,
        readonly totalComments: TotalComments,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt,
        readonly deletedAt: Nullable<DeletedAt>
  ) {
    super()
  }

  static create (
    id: Id,
    communityId: CommunityId,
    userId: UserId,
    spaceId: SpaceId,
    title: Title,
    bannerUrl: Nullable<BannerUrl>,
    author: Author,
    isPaid: IsPaid,
    price: Nullable<Price>
  ): Media {
    const media = new Media(
      id,
      communityId,
      userId,
      spaceId,
      title,
      bannerUrl,
      author,
      isPaid,
      price,
      new TotalLikes(0),
      new TotalComments(0),
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
      null
    )

    media.record(MediaCreatedDomainEvent.fromAggregate(media))

    return media
  }

  update (
    id: Id,
    title: Title,
    bannerUrl: Nullable<BannerUrl>,
    isPaid: IsPaid,
    price: Nullable<Price>
  ): Media {
    const media = new Media(
      id,
      this.communityId,
      this.userId,
      this.spaceId,
      title,
      bannerUrl,
      this.author,
      isPaid,
      price,
      this.totalLikes,
      this.totalComments,
      this.createdAt,
      new UpdatedAt(new Date()),
      null
    )

    media.record(MediaUpdatedDomainEvent.fromAggregate(media))

    return media
  }

  updateAuthor (
    author: Author
  ): Media {
    const media = new Media(
      this.id,
      this.communityId,
      this.userId,
      this.spaceId,
      this.title,
      this.bannerUrl,
      author,
      this.isPaid,
      this.price,
      this.totalLikes,
      this.totalComments,
      this.createdAt,
      this.updatedAt,
      null
    )

    media.record(MediaAuthorUpdatedDomainEvent.fromAggregate(media))

    return media
  }

  updateTotalLikes (
    totalLikes: TotalLikes
  ): Media {
    const media = new Media(
      this.id,
      this.communityId,
      this.userId,
      this.spaceId,
      this.title,
      this.bannerUrl,
      this.author,
      this.isPaid,
      this.price,
      totalLikes,
      this.totalComments,
      this.createdAt,
      new UpdatedAt(new Date()),
      null
    )

    media.record(MediaTotalLikesUpdatedDomainEvent.fromAggregate(media))

    return media
  }

  updateTotalComments (
    totalComments: TotalComments
  ): Media {
    const media = new Media(
      this.id,
      this.communityId,
      this.userId,
      this.spaceId,
      this.title,
      this.bannerUrl,
      this.author,
      this.isPaid,
      this.price,
      this.totalLikes,
      totalComments,
      this.createdAt,
      new UpdatedAt(new Date()),
      null
    )

    media.record(MediaTotalCommentsUpdatedDomainEvent.fromAggregate(media))

    return media
  }

  delete (): Media {
    const media = new Media(
      this.id,
      this.communityId,
      this.userId,
      this.spaceId,
      this.title,
      this.bannerUrl,
      this.author,
      this.isPaid,
      this.price,
      this.totalLikes,
      this.totalComments,
      this.createdAt,
      this.updatedAt,
      new DeletedAt(new Date())
    )

    media.record(MediaDeletedDomainEvent.fromAggregate(media))

    return media
  }
}
