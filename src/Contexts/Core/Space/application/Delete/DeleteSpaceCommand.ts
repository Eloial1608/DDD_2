import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteSpaceCommand implements Command {
  constructor (
        readonly id: string,
        readonly communityId: string
  ) {}
}
