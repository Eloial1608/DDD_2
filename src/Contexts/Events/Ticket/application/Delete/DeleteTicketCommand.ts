import { Command } from '@Shared/domain/CommandBus/Command'

export class DeleteTicketCommand implements Command {
  constructor (
        readonly id: string
  ) {}
}
