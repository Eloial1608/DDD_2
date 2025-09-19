import { Command } from '@Shared/domain/CommandBus/Command'

export class UpdateLevelCommand implements Command {
  constructor (
    readonly id: string,
    readonly communityId: string,
    readonly minimumExp: number
  ) {}
}
