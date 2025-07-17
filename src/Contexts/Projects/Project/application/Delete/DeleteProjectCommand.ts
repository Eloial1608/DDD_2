import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteProjectCommand implements Command {
  constructor (
        readonly id: string,
        readonly communityId: string,
        readonly userId: string
  ) {}
}
