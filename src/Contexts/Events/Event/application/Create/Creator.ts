import { DataNeeded } from '@Events/Event/domain/Errors/DataNeeded'
import { LocationNeeded } from '@Events/Event/domain/Errors/LocationNeeded'
import { Event } from '@Events/Event/domain/Event'
import { EventRepository } from '@Events/Event/domain/EventRepository'
import { Accessibility, EventAccessibilities } from '@Events/Event/domain/ValueObjects/Accessibility'
import { Author } from '@Events/Event/domain/ValueObjects/Author'
import { BannerUrl } from '@Events/Event/domain/ValueObjects/BannerUrl'
import { CommunityId } from '@Events/Event/domain/ValueObjects/CommunityId'
import { Data } from '@Events/Event/domain/ValueObjects/Data'
import { Description } from '@Events/Event/domain/ValueObjects/Description'
import { EndDate } from '@Events/Event/domain/ValueObjects/EndDate'
import { Id } from '@Events/Event/domain/ValueObjects/Id'
import { IsPaid } from '@Events/Event/domain/ValueObjects/IsPaid'
import { IsPrivate } from '@Events/Event/domain/ValueObjects/IsPrivate'
import { Location } from '@Events/Event/domain/ValueObjects/Location'
import { MaxOnlineMembers } from '@Events/Event/domain/ValueObjects/MaxOnlineMembers'
import { MaxOnSiteMembers } from '@Events/Event/domain/ValueObjects/MaxOnSiteMembers'
import { SpaceId } from '@Events/Event/domain/ValueObjects/SpaceId'
import { StartDate } from '@Events/Event/domain/ValueObjects/StartDate'
import { Title } from '@Events/Event/domain/ValueObjects/Title'
import { Type } from '@Events/Event/domain/ValueObjects/Type'
import { UserId } from '@Events/Event/domain/ValueObjects/UserId'
import { FindSpaceByIdQuery } from '@Events/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Events/Space/application/SpaceResponse'
import { FindUsersByCriteriaQuery } from '@Events/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Events/User/application/UserCollectionResponse'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'

export class Creator {
  constructor (private readonly repository: EventRepository, private readonly eventBus: EventBus, private readonly queryBus: QueryBus) {}

  async run (
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
    isPaid: IsPaid,
    type: Type,
    data: Nullable<Data>,
    maxOnlineMembers: Nullable<MaxOnlineMembers>,
    maxOnSiteMembers: MaxOnSiteMembers,
    location: Nullable<Location>
  ) {
    const existing = await this.repository.find(id)

    if (existing) return

    const user = await this.findUserByIdAndCommunityId(userId, communityId)

    if (!user) return

    const space = await this.findSpaceById(spaceId)

    if (space.communityId.valueOf() !== communityId.valueOf()) return

    this.checkAccessibility(id, accessibility, data, location)

    const event = Event.create(
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
      new Author(
        user.id,
        user.mainId,
        user.name,
        user.username,
        user.pictureUrl,
        user.bannerUrl
      ),
      isPaid,
      type,
      data,
      maxOnlineMembers,
      maxOnSiteMembers,
      location
    )

    await this.repository.persist(event)
    await this.eventBus.publish(event.pullDomainEvents())
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

  private async findSpaceById (id: SpaceId) {
    const spaceQuery = new FindSpaceByIdQuery(id.valueOf())

    return (await this.queryBus.ask<SpaceResponse>(spaceQuery)).response
  }

  private checkAccessibility (id: Id, accessibility: Accessibility, data: Nullable<Data>, location: Nullable<Location>) {
    if (accessibility.valueOf() === EventAccessibilities.ONLINE || accessibility.valueOf() === EventAccessibilities.HYBRID) {
      if (!data) throw new DataNeeded(id)
    }

    if (accessibility.valueOf() === EventAccessibilities.ONSITE || accessibility.valueOf() === EventAccessibilities.HYBRID) {
      if (!location) throw new LocationNeeded(id)
    }
  }
}
