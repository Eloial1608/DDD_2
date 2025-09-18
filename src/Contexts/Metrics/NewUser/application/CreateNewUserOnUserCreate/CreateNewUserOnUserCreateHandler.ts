import { UserCreatedDomainEvent } from '@Core/User/domain/Events/UserCreatedDomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Creator } from './Creator'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { UserId } from '@Metrics/NewUser/domain/ValueObjects/UserId'
import { CommunityId } from '@Metrics/NewUser/domain/ValueObjects/CommunityId'

export class CreateNewUserOnUserCreateHandler implements DomainEventSubscriber<UserCreatedDomainEvent> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Array<DomainEventClass> {
    return [UserCreatedDomainEvent]
  }

  async on (domainEvent: UserCreatedDomainEvent): Promise<void> {
    await this.creator.run(
      new UserId(domainEvent.id),
      new CommunityId(domainEvent.communityId)
    )
  }
}
