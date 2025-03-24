import { Command } from '@Shared/domain/CommandBus/Command'

export class UpdateCommentCommand implements Command {
  constructor (
        readonly id: string,
        readonly userId: string,
        readonly content: string
  ) {}
}
