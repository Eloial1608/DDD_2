import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateLevelCommand implements Command {
  constructor (
    readonly id: string,
    readonly communityId: string,
    readonly levelNumber: number,
    readonly minimumExp: number
  ) {}
}
