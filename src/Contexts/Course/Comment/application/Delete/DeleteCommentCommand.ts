import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteCommentCommand implements Command {
  constructor (
        readonly id: string,
        readonly userId: string
  ) {}
}
