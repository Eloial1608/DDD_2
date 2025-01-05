import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateLikeCommand implements Command {
  constructor (
        readonly id: string,
        readonly mediaId: string,
        readonly userId: string
  ) {}
}
