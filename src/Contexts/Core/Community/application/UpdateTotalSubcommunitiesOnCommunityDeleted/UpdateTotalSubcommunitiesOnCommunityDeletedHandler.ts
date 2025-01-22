import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { CommunityDeletedDomainEvent } from '@Core/Community/domain/Events/CommunityDeletedDomainEvent'
import { ParentId } from '@Core/Community/domain/ValueObjects/ParentId'
import { CommunitySubcommunitiesCountUpdatedDomainEvent } from '@Core/Community/domain/Events/CommunitySubcommunitiesCountUpdatedDomainEvent'

export class UpdateTotalSubcommunitiesOnCommunityDeletedHandler implements DomainEventSubscriber<CommunityDeletedDomainEvent | CommunitySubcommunitiesCountUpdatedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [CommunityDeletedDomainEvent, CommunitySubcommunitiesCountUpdatedDomainEvent]
  }

  async on (domainEvent: CommunityDeletedDomainEvent | CommunitySubcommunitiesCountUpdatedDomainEvent): Promise<void> {
    if (!domainEvent.parentId || !domainEvent.mainId) return

    await this.updater.run(
      new ParentId(domainEvent.parentId),
      -1
    )
  }
}
