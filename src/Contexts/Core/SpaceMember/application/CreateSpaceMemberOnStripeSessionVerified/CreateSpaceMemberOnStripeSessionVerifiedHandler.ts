import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { Creator } from './Creator'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/SpaceMember/domain/ValueObjects/Id'
import { UserId } from '@Core/SpaceMember/domain/ValueObjects/UserId'
import { SpaceId } from '@Core/SpaceMember/domain/ValueObjects/SpaceId'
import { StripeSessionVerifiedDomainEvent } from '@Stripe/StripeSession/domain/Events/StripeSessionVerifiedDomainEvent'
import { ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'

export class CreateSpaceMemberOnStripeSessionVerifiedHandler implements CommandHandler<StripeSessionVerifiedDomainEvent> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return StripeSessionVerifiedDomainEvent
  }

  async handle (command: StripeSessionVerifiedDomainEvent): Promise<void> {
    if (command.product.type !== ProductTypes.SPACE) return

    await this.creator.run(
      new Id(command.id),
      new UserId(command.customerId),
      new SpaceId(command.product.id)
    )
  }
}
