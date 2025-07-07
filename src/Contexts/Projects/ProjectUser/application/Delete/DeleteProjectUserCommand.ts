import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteProjectUserCommand implements Command {
  constructor (
        readonly id: string
  ) {}
}
