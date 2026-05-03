import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteUserCommand implements Command {
  constructor (
        readonly id: string
  ) {}
}
