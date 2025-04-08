import { SpaceMemberCreatedDomainEvent } from '@Core/SpaceMember/domain/Events/SpaceMemberCreatedDomainEvent'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Creator } from './Creator'
import { Id } from '@Chat/SpaceMember/domain/ValueObjects/Id'
import { UserId } from '@Chat/SpaceMember/domain/ValueObjects/UserId'
import { SpaceId } from '@Chat/SpaceMember/domain/ValueObjects/SpaceId'
import { IsModerator } from '@Chat/SpaceMember/domain/ValueObjects/IsModerator'

export class CreateSpaceMemberOnSpaceMemberCreatedHandler implements DomainEventSubscriber <SpaceMemberCreatedDomainEvent> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Array<DomainEventClass> {
    return [SpaceMemberCreatedDomainEvent]
  }

  async on (domainEvent: SpaceMemberCreatedDomainEvent): Promise<void> {
    await this.creator.run(
      new Id(domainEvent.id),
      new SpaceId(domainEvent.spaceId),
      new UserId(domainEvent.userId),
      new IsModerator(domainEvent.isModerator)
    )
  }
}
