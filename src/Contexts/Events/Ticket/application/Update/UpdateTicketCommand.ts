import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class UpdateTicketCommand implements Command {
  constructor (
        readonly id: string,
        readonly title: string,
        readonly description: Nullable<string>,
        readonly price: {value: number, currency: string}
  ) {}
}
