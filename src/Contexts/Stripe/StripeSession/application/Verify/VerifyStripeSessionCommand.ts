import { Command } from '@Shared/domain/CommandBus/Command'

export class VerifyStripeSessionCommand implements Command {
  constructor (
        readonly id: string
  ) {}
}
