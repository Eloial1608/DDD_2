import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateStripeAccountCommand } from './CreateStripeAccountCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Stripe/StripeAccount/domain/ValueObjects/Id'
import { ApiKey } from '@Stripe/StripeAccount/domain/ValueObjects/ApiKey'

export class CreateStripeAccountCommandHandler implements CommandHandler<CreateStripeAccountCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateStripeAccountCommand
  }

  async handle (command: CreateStripeAccountCommand): Promise<void> {
    await this.creator.run(
      new Id(command.id),
      new ApiKey(command.apiKey)
    )
  }
}
