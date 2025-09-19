import { CommunityId } from '@Core/SpaceUserTitle/domain/ValueObjects/CommunityId'
import { Deleter } from './Deleter'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { CommunityDeletedDomainEvent } from '@Core/Community/domain/Events/CommunityDeletedDomainEvent'

export class DeleteCommunityConfigurationOnCommunityDeletedHandler implements DomainEventSubscriber<CommunityDeletedDomainEvent> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): DomainEventClass[] {
    return [CommunityDeletedDomainEvent]
  }

  async on (event: CommunityDeletedDomainEvent): Promise<void> {
    await this.deleter.run(
      new CommunityId(event.id)
    )
  }
}
