import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateStripeSessionCommand implements Command {
  constructor (
    readonly id: string,
    readonly accountId: string,
    readonly productId: string,
    readonly customerId: string,
    readonly successUrl: string,
    readonly failUrl: string
  ) {}
}
