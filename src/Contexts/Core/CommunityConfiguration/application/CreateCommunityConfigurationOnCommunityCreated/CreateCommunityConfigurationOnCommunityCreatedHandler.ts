import { CommunityId } from '@Core/SpaceUserTitle/domain/ValueObjects/CommunityId'
import { Creator } from './Creator'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { CommunityCreatedDomainEvent } from '@Chat/Community/domain/Events/CommunityCreatedDomainEvent'

export class CreateCommunityConfigurationOnCommunityCreatedHandler implements DomainEventSubscriber<CommunityCreatedDomainEvent> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): DomainEventClass[] {
    return [CommunityCreatedDomainEvent]
  }

  async on (event: CommunityCreatedDomainEvent): Promise<void> {
    await this.creator.run(
      new CommunityId(event.id)
    )
  }
}
