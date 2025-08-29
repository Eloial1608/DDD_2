import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteTitleCommand implements Command {
  constructor (
        readonly id: string,
        readonly communityId: string,
  ) {}
}
