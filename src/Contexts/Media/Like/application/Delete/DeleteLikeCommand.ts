import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteLikeCommand implements Command {
  constructor (
        readonly id: string,
        readonly userId: string
  ) {}
}
