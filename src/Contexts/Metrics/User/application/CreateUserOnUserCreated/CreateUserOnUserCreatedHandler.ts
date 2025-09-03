import { UserCreatedDomainEvent } from '@Core/User/domain/Events/UserCreatedDomainEvent'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Creator } from './Creator'
import { Id } from '@Metrics/User/domain/ValueObjects/Id'
import { CommunityId } from '@Metrics/User/domain/ValueObjects/CommunityId'
import { MainId } from '@Metrics/User/domain/ValueObjects/MainId'
import { Name } from '@Metrics/User/domain/ValueObjects/Name'
import { Username } from '@Metrics/User/domain/ValueObjects/Username'
import { IsAdmin } from '@Metrics/User/domain/ValueObjects/IsAdmin'
import { IsOwner } from '@Metrics/User/domain/ValueObjects/IsOwner'

export class CreateUserOnUserCreatedHandler implements DomainEventSubscriber <UserCreatedDomainEvent> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Array<DomainEventClass> {
    return [UserCreatedDomainEvent]
  }

  async on (domainEvent: UserCreatedDomainEvent): Promise<void> {
    await this.creator.run(
      new Id(domainEvent.id),
      new MainId(domainEvent.mainId),
      new CommunityId(domainEvent.communityId),
      new Name(domainEvent.name),
      new Username(domainEvent.username),
      new IsAdmin(domainEvent.isAdmin),
      new IsOwner(domainEvent.isOwner)
    )
  }
}
