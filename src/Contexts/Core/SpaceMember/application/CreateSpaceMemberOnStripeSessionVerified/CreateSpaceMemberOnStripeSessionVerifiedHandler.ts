import { Creator } from './Creator'
import { Id } from '@Core/SpaceMember/domain/ValueObjects/Id'
import { UserId } from '@Core/SpaceMember/domain/ValueObjects/UserId'
import { SpaceId } from '@Core/SpaceMember/domain/ValueObjects/SpaceId'
import { StripeSessionVerifiedDomainEvent } from '@Stripe/StripeSession/domain/Events/StripeSessionVerifiedDomainEvent'
import { ProductTypes } from '@Stripe/StripeProduct/domain/ValueObjects/ProductType'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'

export class CreateSpaceMemberOnStripeSessionVerifiedHandler implements DomainEventSubscriber<StripeSessionVerifiedDomainEvent> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Array<DomainEventClass> {
    return [StripeSessionVerifiedDomainEvent]
  }

  async on (command: StripeSessionVerifiedDomainEvent): Promise<void> {
    if (command.product.type !== ProductTypes.SPACE) return

    await this.creator.run(
      new Id(command.id),
      new UserId(command.customerId),
      new SpaceId(command.product.id)
    )
  }
}
