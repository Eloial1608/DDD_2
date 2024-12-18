import { Command } from '@Shared/domain/CommandBus/Command'

export class UnbanUserCommand implements Command {
  constructor (
        readonly id: string
  ) {}
}
