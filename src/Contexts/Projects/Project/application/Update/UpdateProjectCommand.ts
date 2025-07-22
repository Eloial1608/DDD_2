import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class UpdateProjectCommand implements Command {
  constructor (
        readonly id: string,
        readonly communityId: string,
        readonly userId: string,
        readonly spaceId: string,
        readonly title: string,
        readonly description: Nullable<string>,
        readonly bannerUrl: Nullable<string>,
        readonly leadUserId: string,
        readonly startDate: Nullable<Date>,
        readonly endDate: Nullable<Date>
  ) {}
}
