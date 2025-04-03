import { CreateEventCommand } from '@Events/Event/application/Create/CreateEventCommand'
import { Event } from '@Events/Event/domain/Event'
import { Nullable } from '@Shared/domain/Nullable'
import { EventAccessibilities } from '@Events/Event/domain/ValueObjects/Accessibility'
import { ValidPlatforms } from '@Events/Event/domain/ValueObjects/Data'
import { EventTypes } from '@Events/Event/domain/ValueObjects/Type'

export class CreateEventCommandMother {
  static create (
    id: string,
    communityId: string,
    userId: string,
    spaceId: string,
    title: string,
    description: Nullable<string>,
    startDate: Date,
    endDate: Date,
    isPrivate: boolean,
    accessibility: EventAccessibilities,
    bannerUrl: Nullable<string>,
    isPaid: boolean,
    type: EventTypes,
    data: Nullable<{
      url: string,
      platform: ValidPlatforms
    }>,
    maxOnlineMembers: Nullable<number>,
    maxOnSiteMembers: number,
    location: Nullable<string>
  ): CreateEventCommand {
    return new CreateEventCommand(
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
      isPaid,
      type,
      data,
      maxOnlineMembers,
      maxOnSiteMembers,
      location
    )
  }

  static fromAggregate (event: Event): CreateEventCommand {
    return this.create(
      event.id.valueOf(),
      event.communityId.valueOf(),
      event.userId.valueOf(),
      event.spaceId.valueOf(),
      event.title.valueOf(),
      event.description?.valueOf(),
      event.startDate.valueOf(),
      event.endDate.valueOf(),
      event.isPrivate.valueOf(),
      event.accessibility.valueOf(),
      event.bannerUrl?.valueOf(),
      event.isPaid.valueOf(),
      event.type.valueOf(),
      event.data?.toPrimitives(),
      event.maxOnlineMembers?.valueOf(),
      event.maxOnSiteMembers.valueOf(),
      event.location?.valueOf()
    )
  }
}
