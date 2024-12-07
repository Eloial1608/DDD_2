import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateAccountCommand implements Command {
  constructor (
        readonly id: string,
        readonly name: string,
        readonly email: string
  ) {}
}
