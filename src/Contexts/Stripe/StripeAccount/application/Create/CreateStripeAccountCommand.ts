import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateStripeAccountCommand implements Command {
  constructor (
        readonly id: string,
        readonly apiKey: string
  ) {}
}
