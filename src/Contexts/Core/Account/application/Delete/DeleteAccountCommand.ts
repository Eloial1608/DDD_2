import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteAccountCommand implements Command {
  constructor (
        readonly id: string
  ) {}
}
