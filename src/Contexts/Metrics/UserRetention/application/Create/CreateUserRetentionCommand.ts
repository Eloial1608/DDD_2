import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateUserRetentionCommand implements Command {
  constructor (
        readonly id: string,
        readonly userId: string,
        readonly communityId: string
  ) {}
}
