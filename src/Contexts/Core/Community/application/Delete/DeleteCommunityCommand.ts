import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteCommunityCommand implements Command {
  constructor (
        readonly id: string
  ) {}
}
