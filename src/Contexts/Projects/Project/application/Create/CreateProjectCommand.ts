import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateProjectCommand implements Command {
  constructor (
        readonly id: string,
        readonly title: string,
        readonly description: Nullable<string>,
        readonly bannerUrl: Nullable<string>,
        readonly leadUserId: string,
        readonly startDate: Nullable<Date>,
        readonly endDate: Nullable<Date>,
        readonly communityId: string,
        readonly spaceId: string,
        readonly userId :string
  ) {}
}
