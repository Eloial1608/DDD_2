import { UpdateEventCommand } from '@Events/Event/application/Update/UpdateEventCommand'
import { Event } from '@Events/Event/domain/Event'
import { Nullable } from '@Shared/domain/Nullable'
import { ValidPlatforms } from '@Events/Event/domain/ValueObjects/Data'
import { EventTypes } from '@Events/Event/domain/ValueObjects/Type'

export class UpdateEventCommandMother {
  static update (
    id: string,
    userId: string,
    title: string,
    description: Nullable<string>,
    startDate: Date,
    endDate: Date,
    bannerUrl: Nullable<string>,
    type: EventTypes,
    data: Nullable<{
      url: string,
      platform: ValidPlatforms
    }>,
    maxOnlineMembers: Nullable<number>,
    maxOnSiteMembers: number,
    location: Nullable<string>
  ): UpdateEventCommand {
    return new UpdateEventCommand(
      id,
      title,
      description,
      userId,
      startDate,
      endDate,
      bannerUrl,
      type,
      data,
      maxOnlineMembers,
      maxOnSiteMembers,
      location
    )
  }

  static fromAggregate (event: Event): UpdateEventCommand {
    return this.update(
      event.id.valueOf(),
      event.userId.valueOf(),
      event.title.valueOf(),
      event.description?.valueOf(),
      event.startDate.valueOf(),
      event.endDate.valueOf(),
      event.bannerUrl?.valueOf(),
      event.type.valueOf(),
      event.data?.toPrimitives(),
      event.maxOnlineMembers?.valueOf(),
      event.maxOnSiteMembers.valueOf(),
      event.location?.valueOf()
    )
  }
}
