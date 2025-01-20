import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { CommunityCreatedDomainEvent } from '@Core/Community/domain/Events/CommunityCreatedDomainEvent'
import { ParentId } from '@Core/Community/domain/ValueObjects/ParentId'
import { CommunitySubcommunitiesCountUpdatedDomainEvent } from '@Core/Community/domain/Events/CommunitySubcommunitiesCountUpdatedDomainEvent'

export class UpdateTotalSubcommunitiesOnCommunityCreatedHandler implements DomainEventSubscriber<CommunityCreatedDomainEvent | CommunitySubcommunitiesCountUpdatedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [CommunityCreatedDomainEvent, CommunitySubcommunitiesCountUpdatedDomainEvent]
  }

  async on (domainEvent: CommunityCreatedDomainEvent | CommunitySubcommunitiesCountUpdatedDomainEvent): Promise<void> {
    if (!domainEvent.parentId || !domainEvent.mainId) return

    await this.updater.run(
      new ParentId(domainEvent.parentId),
      1
    )
  }
}
