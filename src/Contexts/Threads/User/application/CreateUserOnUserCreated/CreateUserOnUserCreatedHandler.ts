import { UserCreatedDomainEvent } from '@Core/User/domain/Events/UserCreatedDomainEvent'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Creator } from './Creator'
import { Id } from '@Threads/User/domain/ValueObjects/Id'
import { CommunityId } from '@Threads/User/domain/ValueObjects/CommunityId'
import { MainId } from '@Threads/User/domain/ValueObjects/MainId'
import { Name } from '@Threads/User/domain/ValueObjects/Name'
import { Username } from '@Threads/User/domain/ValueObjects/Username'
import { PictureUrl } from '@Threads/User/domain/ValueObjects/PictureUrl'
import { BannerUrl } from '@Threads/User/domain/ValueObjects/BannerUrl'
import { IsAdmin } from '@Threads/User/domain/ValueObjects/IsAdmin'
import { IsOwner } from '@Threads/User/domain/ValueObjects/IsOwner'

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
      domainEvent.pictureUrl ? new PictureUrl(domainEvent.pictureUrl) : null,
      domainEvent.bannerUrl ? new BannerUrl(domainEvent.bannerUrl) : null,
      new IsAdmin(domainEvent.isAdmin),
      new IsOwner(domainEvent.isOwner)
    )
  }
}
