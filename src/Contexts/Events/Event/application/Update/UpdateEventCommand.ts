import { EventAccessibilities } from '@Events/Event/domain/ValueObjects/Accessibility'
import { ValidPlatforms } from '@Events/Event/domain/ValueObjects/Data'
import { EventTypes } from '@Events/Event/domain/ValueObjects/Type'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class UpdateEventCommand implements Command {
  constructor (
        readonly id: string,
        readonly title: string,
        readonly description: Nullable<string>,
        readonly userId: string,
        readonly startDate: Date,
        readonly endDate: Date,
        readonly isPrivate: boolean,
        readonly accessibility: EventAccessibilities,
        readonly bannerUrl: Nullable<string>,
        readonly type: EventTypes,
        readonly data: Nullable<{
          url: string,
          platform: ValidPlatforms
        }>,
        readonly maxOnlineMembers: Nullable<number>,
        readonly maxOnSiteMembers: number,
        readonly location: Nullable<string>
  ) {}
}
