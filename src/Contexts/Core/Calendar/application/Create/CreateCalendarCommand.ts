import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateCalendarCommand implements Command {
  constructor (
        readonly id: string,
        readonly dateAt: Date,
        readonly userIds: string[],
        readonly communityId: string,
        readonly content: string,
        readonly entityId: Nullable<string>,
        readonly entityType: Nullable<string>
  ) {}
}
