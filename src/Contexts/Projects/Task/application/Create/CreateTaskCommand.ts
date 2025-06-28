import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateTaskCommand implements Command {
  constructor (
        readonly id: string,
        readonly title: string,
        readonly description: Nullable<string>,
        readonly assignedUserId: Nullable<string>,
        readonly priority: Nullable<number>,
        readonly status: Nullable<string>,
        readonly type: Nullable<string>,
        readonly deadline: Nullable<Date>,
        readonly points: Nullable<number>,
        readonly projectId: string,
        readonly communityId: string,
        readonly deletedAt: Nullable<Date>
  ) {}
}
