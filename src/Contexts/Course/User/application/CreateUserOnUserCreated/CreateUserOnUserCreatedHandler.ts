import { UserCreatedDomainEvent } from '@Core/User/domain/Events/UserCreatedDomainEvent'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Creator } from './Creator'
import { Id } from '@Course/User/domain/ValueObjects/Id'
import { CommunityId } from '@Course/User/domain/ValueObjects/CommunityId'
import { MainId } from '@Course/User/domain/ValueObjects/MainId'
import { Name } from '@Course/User/domain/ValueObjects/Name'
import { Username } from '@Course/User/domain/ValueObjects/Username'
import { PictureUrl } from '@Course/User/domain/ValueObjects/PictureUrl'
import { BannerUrl } from '@Course/User/domain/ValueObjects/BannerUrl'
import { IsAdmin } from '@Course/User/domain/ValueObjects/IsAdmin'
import { IsOwner } from '@Course/User/domain/ValueObjects/IsOwner'

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
