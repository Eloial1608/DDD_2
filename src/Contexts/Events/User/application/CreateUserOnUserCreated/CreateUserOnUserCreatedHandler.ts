import { UserCreatedDomainEvent } from '@Core/User/domain/Events/UserCreatedDomainEvent'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Creator } from './Creator'
import { Id } from '@Events/User/domain/ValueObjects/Id'
import { CommunityId } from '@Events/User/domain/ValueObjects/CommunityId'
import { MainId } from '@Events/User/domain/ValueObjects/MainId'
import { Name } from '@Events/User/domain/ValueObjects/Name'
import { Username } from '@Events/User/domain/ValueObjects/Username'
import { PictureUrl } from '@Events/User/domain/ValueObjects/PictureUrl'
import { BannerUrl } from '@Events/User/domain/ValueObjects/BannerUrl'
import { IsAdmin } from '@Events/User/domain/ValueObjects/IsAdmin'
import { IsOwner } from '@Events/User/domain/ValueObjects/IsOwner'

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
