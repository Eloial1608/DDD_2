import { Command } from '@Shared/domain/CommandBus/Command'

export class UpdateStripeAccountCommand implements Command {
  constructor (
        readonly id: string,
        readonly apiKey: string
  ) {}
}
