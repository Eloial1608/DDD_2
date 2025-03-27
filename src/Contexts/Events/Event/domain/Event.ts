import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UserId } from './ValueObjects/UserId'
import { Id } from './ValueObjects/Id'
import { EventCreatedDomainEvent } from './Events/EventCreatedDomainEvent'
import { CommunityId } from './ValueObjects/CommunityId'
import { SpaceId } from './ValueObjects/SpaceId'
import { Title } from './ValueObjects/Title'
import { Description } from './ValueObjects/Description'
import { StartDate } from './ValueObjects/StartDate'
import { EndDate } from './ValueObjects/EndDate'
import { IsPrivate } from './ValueObjects/IsPrivate'
import { Nullable } from '@Shared/domain/Nullable'
import { BannerUrl } from './ValueObjects/BannerUrl'
import { Author } from './ValueObjects/Author'
import { IsPaid } from './ValueObjects/IsPaid'
import { Type } from './ValueObjects/Type'
import { Data } from './ValueObjects/Data'
import { MaxOnlineMembers } from './ValueObjects/MaxOnlineMembers'
import { MaxOnSiteMembers } from './ValueObjects/MaxOnSiteMembers'
import { TotalOnlineMembers } from './ValueObjects/TotalOnlineMembers'
import { TotalOnSiteMembers } from './ValueObjects/TotalOnSiteMembers'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { Location } from './ValueObjects/Location'
import { Accessibility } from './ValueObjects/Accessibility'
import { EventDeletedDomainEvent } from './Events/EventDeletedDomainEvent'
import { EventUpdatedDomainEvent } from './Events/EventUpdatedDomainEvent'
import { EventAuthorUpdatedDomainEvent } from './Events/EventAuthorUpdatedDomainEvent'

export class Event extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly communityId: CommunityId,
        readonly spaceId: SpaceId,
        readonly title: Title,
        readonly description: Nullable<Description>,
        readonly userId: UserId,
        readonly startDate: StartDate,
        readonly endDate: EndDate,
        readonly isPrivate: IsPrivate,
        readonly accessibility: Accessibility,
        readonly bannerUrl: Nullable<BannerUrl>,
        readonly author: Author,
        readonly isPaid: IsPaid,
        readonly type: Type,
        readonly data: Nullable<Data>,
        readonly maxOnlineMembers: Nullable<MaxOnlineMembers>,
        readonly maxOnSiteMembers: MaxOnSiteMembers,
        readonly totalOnlineMembers: TotalOnlineMembers,
        readonly totalOnSiteMembers: TotalOnSiteMembers,
        readonly location: Nullable<Location>,
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
    description: Nullable<Description>,
    userId: UserId,
    startDate: StartDate,
    endDate: EndDate,
    isPrivate: IsPrivate,
    accessibility: Accessibility,
    bannerUrl: Nullable<BannerUrl>,
    author: Author,
    isPaid: IsPaid,
    type: Type,
    data: Nullable<Data>,
    maxOnlineMembers: Nullable<MaxOnlineMembers>,
    maxOnSiteMembers: MaxOnSiteMembers,
    location: Nullable<Location>
  ): Event {
    const event = new Event(
      id,
      communityId,
      spaceId,
      title,
      description,
      userId,
      startDate,
      endDate,
      isPrivate,
      accessibility,
      bannerUrl,
      author,
      isPaid,
      type,
      data,
      maxOnlineMembers,
      maxOnSiteMembers,
      new TotalOnlineMembers(0),
      new TotalOnSiteMembers(0),
      location,
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
      null
    )

    event.record(EventCreatedDomainEvent.fromAggregate(event))

    return event
  }

  update (
    title: Title,
    description: Nullable<Description>,
    startDate: StartDate,
    endDate: EndDate,
    bannerUrl: Nullable<BannerUrl>,
    type: Type,
    data: Nullable<Data>,
    maxOnlineMembers: Nullable<MaxOnlineMembers>,
    maxOnSiteMembers: MaxOnSiteMembers,
    location: Nullable<Location>
  ): Event {
    const event = new Event(
      this.id,
      this.communityId,
      this.spaceId,
      title,
      description,
      this.userId,
      startDate,
      endDate,
      this.isPrivate,
      this.accessibility,
      bannerUrl,
      this.author,
      this.isPaid,
      type,
      data,
      maxOnlineMembers,
      maxOnSiteMembers,
      this.totalOnlineMembers,
      this.totalOnSiteMembers,
      location,
      this.createdAt,
      new UpdatedAt(new Date()),
      null
    )

    event.record(EventUpdatedDomainEvent.fromAggregate(event))

    return event
  }

  delete (): Event {
    const event = new Event(
      this.id,
      this.communityId,
      this.spaceId,
      this.title,
      this.description,
      this.userId,
      this.startDate,
      this.endDate,
      this.isPrivate,
      this.accessibility,
      this.bannerUrl,
      this.author,
      this.isPaid,
      this.type,
      this.data,
      this.maxOnlineMembers,
      this.maxOnSiteMembers,
      this.totalOnlineMembers,
      this.totalOnSiteMembers,
      this.location,
      this.createdAt,
      this.updatedAt,
      new DeletedAt(new Date())
    )

    event.record(EventDeletedDomainEvent.fromAggregate(event))

    return event
  }

  updateAuthor (
    author: Author
  ): Event {
    const event = new Event(
      this.id,
      this.communityId,
      this.spaceId,
      this.title,
      this.description,
      this.userId,
      this.startDate,
      this.endDate,
      this.isPrivate,
      this.accessibility,
      this.bannerUrl,
      author,
      this.isPaid,
      this.type,
      this.data,
      this.maxOnlineMembers,
      this.maxOnSiteMembers,
      this.totalOnlineMembers,
      this.totalOnSiteMembers,
      this.location,
      this.createdAt,
      this.updatedAt,
      this.deletedAt
    )

    event.record(EventAuthorUpdatedDomainEvent.fromAggregate(event))

    return event
  }
}
