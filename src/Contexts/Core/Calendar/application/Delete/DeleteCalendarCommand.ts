import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteCalendarCommand implements Command {
  constructor (
        readonly id: string,
        readonly communityId: string
  ) {}
}
