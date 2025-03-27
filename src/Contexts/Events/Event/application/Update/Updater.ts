import { DataNeeded } from '@Events/Event/domain/Errors/DataNeeded'
import { EventNotFound } from '@Events/Event/domain/Errors/EventNotFound'
import { InvalidMaxOnlineMembers } from '@Events/Event/domain/Errors/InvalidMaxOnlineMembers'
import { InvalidMaxOnSiteMembers } from '@Events/Event/domain/Errors/InvalidMaxOnSiteMembers'
import { LocationNeeded } from '@Events/Event/domain/Errors/LocationNeeded'
import { EventRepository } from '@Events/Event/domain/EventRepository'
import { Accessibility, EventAccessibilities } from '@Events/Event/domain/ValueObjects/Accessibility'
import { BannerUrl } from '@Events/Event/domain/ValueObjects/BannerUrl'
import { CommunityId } from '@Events/Event/domain/ValueObjects/CommunityId'
import { Data } from '@Events/Event/domain/ValueObjects/Data'
import { Description } from '@Events/Event/domain/ValueObjects/Description'
import { EndDate } from '@Events/Event/domain/ValueObjects/EndDate'
import { Id } from '@Events/Event/domain/ValueObjects/Id'
import { Location } from '@Events/Event/domain/ValueObjects/Location'
import { MaxOnlineMembers } from '@Events/Event/domain/ValueObjects/MaxOnlineMembers'
import { MaxOnSiteMembers } from '@Events/Event/domain/ValueObjects/MaxOnSiteMembers'
import { SpaceId } from '@Events/Event/domain/ValueObjects/SpaceId'
import { StartDate } from '@Events/Event/domain/ValueObjects/StartDate'
import { Title } from '@Events/Event/domain/ValueObjects/Title'
import { TotalOnlineMembers } from '@Events/Event/domain/ValueObjects/TotalOnlineMembers'
import { TotalOnSiteMembers } from '@Events/Event/domain/ValueObjects/TotalOnSiteMembers'
import { Type } from '@Events/Event/domain/ValueObjects/Type'
import { UserId } from '@Events/Event/domain/ValueObjects/UserId'
import { FindSpaceByIdQuery } from '@Events/Space/application/FindById/FindSpaceByIdQuery'
import { SpaceResponse } from '@Events/Space/application/SpaceResponse'
import { FindUsersByCriteriaQuery } from '@Events/User/application/FindByCriteria/FindUsersByCriteriaQuery'
import { UserCollectionResponse } from '@Events/User/application/UserCollectionResponse'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { QueryBus } from '@Shared/domain/QueryBus/QueryBus'

export class Updater {
  constructor (private readonly repository: EventRepository, private readonly eventBus: EventBus, private readonly queryBus: QueryBus) {}

  async run (
    id: Id,
    title: Title,
    description: Nullable<Description>,
    userId: UserId,
    startDate: StartDate,
    endDate: EndDate,
    bannerUrl: Nullable<BannerUrl>,
    type: Type,
    data: Nullable<Data>,
    maxOnlineMembers: Nullable<MaxOnlineMembers>,
    maxOnSiteMembers: MaxOnSiteMembers,
    location: Nullable<Location>
  ) {
    const existing = await this.repository.find(id)

    if (!existing) throw new EventNotFound(id)

    const user = await this.findUserByIdAndCommunityId(userId, existing.communityId)

    if (!user) return

    const space = await this.findSpaceById(existing.spaceId)

    if (space.communityId.valueOf() !== existing.communityId.valueOf()) return

    this.checkAccessibility(
      id,
      existing.accessibility,
      data,
      location
    )
    this.checkMaxUsersByAccessibility(
      existing.accessibility,
      maxOnlineMembers,
      maxOnSiteMembers,
      existing.totalOnlineMembers,
      existing.totalOnSiteMembers
    )

    const event = existing.update(
      title,
      description,
      startDate,
      endDate,
      bannerUrl,
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

  private checkMaxUsersByAccessibility (
    accessibility: Accessibility,
    maxOnlineMembers: Nullable<MaxOnlineMembers>,
    maxOnSiteMembers: MaxOnSiteMembers,
    totalOnlineMembers: TotalOnlineMembers,
    totalOnSiteMembers: TotalOnSiteMembers
  ) {
    if (
      accessibility.valueOf() === EventAccessibilities.ONLINE ||
      accessibility.valueOf() === EventAccessibilities.HYBRID
    ) {
      if (maxOnlineMembers && maxOnlineMembers.valueOf() < totalOnlineMembers.valueOf()) throw new InvalidMaxOnlineMembers()
    }

    if (
      accessibility.valueOf() === EventAccessibilities.ONSITE ||
      accessibility.valueOf() === EventAccessibilities.HYBRID
    ) {
      if (maxOnSiteMembers.valueOf() < totalOnSiteMembers.valueOf()) throw new InvalidMaxOnSiteMembers()
    }
  }
}
