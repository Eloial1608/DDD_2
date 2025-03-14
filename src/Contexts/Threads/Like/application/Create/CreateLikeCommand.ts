import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateLikeCommand implements Command {
  constructor (
        readonly id: string,
        readonly threadId: string,
        readonly userId: string
  ) {}
}
