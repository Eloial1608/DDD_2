import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Name } from '@Course/User/domain/ValueObjects/Name'
import { Username } from '@Course/User/domain/ValueObjects/Username'
import { PictureUrl } from '@Course/User/domain/ValueObjects/PictureUrl'
import { BannerUrl } from '@Course/User/domain/ValueObjects/BannerUrl'
import { UserUpdatedDomainEvent } from '@Course/User/domain/Events/UserUpdatedDomainEvent'
import { UserId } from '@Course/Course/domain/ValueObjects/UserId'
import { MainId } from '@Course/User/domain/ValueObjects/MainId'

export class UpdateCourseOnUserUpdatedHandler implements DomainEventSubscriber <UserUpdatedDomainEvent> {
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
