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
import { ThreadCreatedDomainEvent } from './Events/ThreadCreatedDomainEvent'
import { ThreadDeletedDomainEvent } from './Events/ThreadDeletedDomainEvent'
import { ThreadUpdatedDomainEvent } from './Events/ThreadUpdatedDomainEvent'
import { ThreadTotalThreadsUpdatedDomainEvent } from './Events/ThreadTotalThreadsUpdatedDomainEvent'
import { ThreadTotalLikesUpdatedDomainEvent } from './Events/ThreadTotalLikesUpdatedDomainEvent'
import { ThreadAuthorUpdatedDomainEvent } from './Events/ThreadAuthorUpdatedDomainEvent'

export class Thread extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly communityId: CommunityId,
        readonly spaceId: SpaceId,
        readonly title: Nullable<Title>,
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

  static create (
    id:Id,
    communityId: CommunityId,
    spaceId: SpaceId,
    title: Nullable<Title>,
    parentThreadId: Nullable<ParentThreadId>,
    userId: UserId,
    content: Content,
    bannerUrl: Nullable<BannerUrl>,
    author: Author,
    isPaid: IsPaid,
    price: Nullable<Price>
  ):Thread {
    const thread = new Thread(
      id,
      communityId,
      spaceId,
      title,
      parentThreadId,
      userId,
      content,
      bannerUrl,
      author,
      isPaid,
      price,
      new TotalLikes(0),
      new TotalThreads(0),
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
      null
    )
    thread.record(ThreadCreatedDomainEvent.fromAggregate(thread))

    return thread
  }

  delete ():Thread {
    const thread = new Thread(
      this.id,
      this.communityId,
      this.spaceId,
      this.title,
      this.parentThreadId,
      this.userId,
      this.content,
      this.bannerUrl,
      this.author,
      this.isPaid,
      this.price,
      this.totalLikes,
      this.totalThreads,
      this.createdAt,
      this.updatedAt,
      new DeletedAt(new Date())
    )

    thread.record(ThreadDeletedDomainEvent.fromAggregate(thread))

    return thread
  }

  update (
    id: Id,
    title: Nullable<Title>,
    parentThreadId:Nullable<ParentThreadId>,
    content: Content,
    bannerUrl: Nullable<BannerUrl>,
    isPaid: IsPaid,
    price: Nullable<Price>
  ): Thread {
    const thread = new Thread(
      id,
      this.communityId,
      this.spaceId,
      title,
      parentThreadId,
      this.userId,
      content,
      bannerUrl,
      this.author,
      isPaid,
      price,
      this.totalLikes,
      this.totalThreads,
      this.createdAt,
      new UpdatedAt(new Date()),
      null
    )

    thread.record(ThreadUpdatedDomainEvent.fromAggregate(thread))

    return thread
  }

  updateTotalThreads (
    totalThreads: TotalThreads
  ):Thread {
    const thread = new Thread(
      this.id,
      this.communityId,
      this.spaceId,
      this.title,
      this.parentThreadId,
      this.userId,
      this.content,
      this.bannerUrl,
      this.author,
      this.isPaid,
      this.price,
      this.totalLikes,
      totalThreads,
      this.createdAt,
      this.updatedAt,
      null
    )

    thread.record(ThreadTotalThreadsUpdatedDomainEvent.fromAggregate(thread))
    return thread
  }

  updateTotalLikes (
    totalLikes: TotalLikes
  ):Thread {
    const thread = new Thread(
      this.id,
      this.communityId,
      this.spaceId,
      this.title,
      this.parentThreadId,
      this.userId,
      this.content,
      this.bannerUrl,
      this.author,
      this.isPaid,
      this.price,
      totalLikes,
      this.totalThreads,
      this.createdAt,
      this.updatedAt,
      null
    )

    thread.record(ThreadTotalLikesUpdatedDomainEvent.fromAggregate(thread))
    return thread
  }

  updateAuthor (
    author: Author
  ):Thread {
    const thread = new Thread(
      this.id,
      this.communityId,
      this.spaceId,
      this.title,
      this.parentThreadId,
      this.userId,
      this.content,
      this.bannerUrl,
      author,
      this.isPaid,
      this.price,
      this.totalLikes,
      this.totalThreads,
      this.createdAt,
      this.updatedAt,
      null
    )

    thread.record(ThreadAuthorUpdatedDomainEvent.fromAggregate(thread))
    return thread
  }
}
