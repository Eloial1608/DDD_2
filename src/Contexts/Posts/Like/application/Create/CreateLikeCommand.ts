import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateLikeCommand implements Command {
  constructor (
        readonly id: string,
        readonly postId: string,
        readonly userId: string
  ) {}
}
