import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateCommentCommand implements Command {
  constructor (
    readonly id: string,
    readonly mediaId: string,
    readonly userId: string,
    readonly content: string
  ) {}
}
