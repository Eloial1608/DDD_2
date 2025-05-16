import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateTicketCommand implements Command {
  constructor (
        readonly id: string,
        readonly eventId: string,
        readonly title: string,
        readonly description: Nullable<string>,
        readonly price: {value: number, currency: string},
        readonly isOnline: boolean,
        readonly isOnSite: boolean,
        readonly communityId: string
  ) {}
}
