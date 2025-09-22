import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateUserLevelCommand implements Command {
  constructor (
    readonly id: string,
    readonly communityId: string,
    readonly userId: string,
    readonly levelId: string,
    readonly currentExp: number
  ) {}
}
