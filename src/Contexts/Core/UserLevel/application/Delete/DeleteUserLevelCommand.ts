import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteUserLevelCommand implements Command {
  constructor (
        readonly id: string,
        readonly communityId: string
  ) {}
}
