import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { CommunityId } from './ValueObjects/CommunityId'
import { UserId } from './ValueObjects/UserId'
import { Title } from './ValueObjects/Title'
import { Content } from './ValueObjects/Content'
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
import { PostCreatedDomainEvent } from './Events/PostCreatedDomainEvent'
import { PostUpdatedDomainEvent } from './Events/PostUpdatedDomainEvent'
import { PostDeletedDomainEvent } from './Events/PostDeletedDomainEvent'
import { SpaceId } from './ValueObjects/SpaceId'
import { PostTotalLikesUpdatedDomainEvent } from './Events/PostTotalLikesUpdatedDomainEvent'

export class Post extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly communityId: CommunityId,
        readonly userId: UserId,
        readonly spaceId: SpaceId,
        readonly title: Title,
        readonly content: Content,
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
    content: Content,
    bannerUrl: Nullable<BannerUrl>,
    author: Author,
    isPaid: IsPaid,
    price: Nullable<Price>
  ): Post {
    const post = new Post(
      id,
      communityId,
      userId,
      spaceId,
      title,
      content,
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

    post.record(PostCreatedDomainEvent.fromAggregate(post))

    return post
  }

  update (
    id: Id,
    title: Title,
    content: Content,
    bannerUrl: Nullable<BannerUrl>,
    isPaid: IsPaid,
    price: Nullable<Price>
  ): Post {
    const post = new Post(
      id,
      this.communityId,
      this.userId,
      this.spaceId,
      title,
      content,
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

    post.record(PostUpdatedDomainEvent.fromAggregate(post))

    return post
  }

  updateTotalLikes (
    totalLikes: TotalLikes
  ): Post {
    const post = new Post(
      this.id,
      this.communityId,
      this.userId,
      this.spaceId,
      this.title,
      this.content,
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

    post.record(PostTotalLikesUpdatedDomainEvent.fromAggregate(post))

    return post
  }

  delete (): Post {
    const post = new Post(
      this.id,
      this.communityId,
      this.userId,
      this.spaceId,
      this.title,
      this.content,
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

    post.record(PostDeletedDomainEvent.fromAggregate(post))

    return post
  }
}
