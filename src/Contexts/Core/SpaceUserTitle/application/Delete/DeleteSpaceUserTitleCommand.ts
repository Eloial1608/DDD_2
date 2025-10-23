import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteSpaceUserTitleCommand implements Command {
  constructor (
        readonly id: string,
        readonly communityId: string
  ) {}
}
