import { Command } from '@Shared/domain/CommandBus/Command'

export class UpdateSpaceUserTitleCommand implements Command {
  constructor (
    readonly id: string,
    readonly communityId: string,
    readonly titleId: string
  ) {}
}
