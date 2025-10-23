import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteLevelCommand implements Command {
  constructor (
        readonly id: string,
        readonly communityId: string
  ) {}
}
