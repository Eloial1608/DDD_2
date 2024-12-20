import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdateStripeAccountCommand } from './UpdateStripeAccountCommand'
import { Updater } from './Updater'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Stripe/StripeAccount/domain/ValueObjects/Id'
import { ApiKey } from '@Stripe/StripeAccount/domain/ValueObjects/ApiKey'

export class UpdateStripeAccountCommandHandler implements CommandHandler<UpdateStripeAccountCommand> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Command {
    return UpdateStripeAccountCommand
  }

  async handle (command: UpdateStripeAccountCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new ApiKey(command.apiKey)
    )
  }
}
