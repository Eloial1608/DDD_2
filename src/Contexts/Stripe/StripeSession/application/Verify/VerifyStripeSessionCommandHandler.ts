import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { VerifyStripeSessionCommand } from './VerifyStripeSessionCommand'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Verificator } from './Verificator'
import { Id } from '@Stripe/StripeSession/domain/ValueObjects/Id'

export class VerifyStripeSessionCommandHandler implements CommandHandler<VerifyStripeSessionCommand> {
  constructor (private readonly verificator: Verificator) {}

  subscribedTo (): Command {
    return VerifyStripeSessionCommand
  }

  async handle (command: VerifyStripeSessionCommand): Promise<void> {
    return await this.verificator.run(new Id(command.id))
  }
}
