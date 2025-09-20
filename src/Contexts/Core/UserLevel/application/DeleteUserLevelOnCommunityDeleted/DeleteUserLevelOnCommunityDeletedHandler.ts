import { CommunityId } from '@Core/UserLevel/domain/ValueObjects/CommunityId'
import { Deleter } from './Deleter'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { CommunityDeletedDomainEvent } from '@Core/Community/domain/Events/CommunityDeletedDomainEvent'

export class DeleteUserLevelOnCommunityDeletedHandler implements DomainEventSubscriber<CommunityDeletedDomainEvent> {
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
