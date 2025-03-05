import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Name } from '@Media/User/domain/ValueObjects/Name'
import { Username } from '@Media/User/domain/ValueObjects/Username'
import { PictureUrl } from '@Media/User/domain/ValueObjects/PictureUrl'
import { BannerUrl } from '@Media/User/domain/ValueObjects/BannerUrl'
import { UserUpdatedDomainEvent } from '@Media/User/domain/Events/UserUpdatedDomainEvent'
import { UserId } from '@Media/Media/domain/ValueObjects/UserId'
import { MainId } from '@Media/User/domain/ValueObjects/MainId'

export class UpdateMediaOnUserUpdatedHandler implements DomainEventSubscriber <UserUpdatedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [UserUpdatedDomainEvent]
  }

  async on (domainEvent: UserUpdatedDomainEvent): Promise<void> {
    await this.updater.run(
      new UserId(domainEvent.id),
      new MainId(domainEvent.mainId),
      new Name(domainEvent.name),
      new Username(domainEvent.username),
      domainEvent.pictureUrl ? new PictureUrl(domainEvent.pictureUrl) : null,
      domainEvent.bannerUrl ? new BannerUrl(domainEvent.bannerUrl) : null
    )
  }
}
