import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteThreadCommand implements Command {
  constructor (
        readonly id: string,
        readonly communityId: string,
        readonly userId: string
  ) {}
}