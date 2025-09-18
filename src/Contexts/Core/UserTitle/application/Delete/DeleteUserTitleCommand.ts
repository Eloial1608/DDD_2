import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteUserTitleCommand implements Command {
  constructor (
        readonly id: string,
        readonly communityId: string
  ) {}
}
