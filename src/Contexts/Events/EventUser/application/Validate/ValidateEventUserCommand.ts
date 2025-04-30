import { Command } from '@Shared/domain/CommandBus/Command'

export class ValidateEventUserCommand implements Command {
  constructor (
        readonly id: string
  ) {}
}
