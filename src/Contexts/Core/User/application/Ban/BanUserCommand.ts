import { Command } from '@Shared/domain/CommandBus/Command'

export class BanUserCommand implements Command {
  constructor (
        readonly id: string
  ) {}
}
