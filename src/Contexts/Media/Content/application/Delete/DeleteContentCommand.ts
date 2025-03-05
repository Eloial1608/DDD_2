import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteContentCommand implements Command {
  constructor (
        readonly id: string,
        readonly communityId: string
  ) {}
}
