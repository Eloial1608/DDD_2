import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateStripeSessionCommand } from './CreateStripeSessionCommand'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Stripe/StripeSession/domain/ValueObjects/Id'
import { AccountId } from '@Stripe/StripeSession/domain/ValueObjects/AccountId'
import { Url } from '@Stripe/StripeSession/domain/ValueObjects/Url'
import { SuccessUrl } from '@Stripe/StripeSession/domain/ValueObjects/SuccessUrl'
import { FailUrl } from '@Stripe/StripeSession/domain/ValueObjects/FailUrl'

export class CreateStripeSessionCommandHandler implements CommandHandler<CreateStripeSessionCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateStripeSessionCommand
  }

  async handle (command: CreateStripeSessionCommand): Promise<void> {
    await this.creator.run({
      id: new Id(command.id),
      accountId: new AccountId(command.accountId),
      url: new Url(command.url),
      productId: command.productId,
      successUrl: new SuccessUrl(command.successUrl),
      failUrl: new FailUrl(command.failUrl)
    })
  }
}
