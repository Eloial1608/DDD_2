import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateUserTitleCommand implements Command {
  constructor (
    readonly id: string,
    readonly communityId: string,
    readonly titleId: string,
    readonly userId: string
  ) {}
}
