import { CommunityId } from '@Core/User/domain/ValueObjects/CommunityId'
import { Updater } from './Updater'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { MainId } from '@Core/User/domain/ValueObjects/MainId'
import { UserBannedDomainEvent } from '@Core/User/domain/Events/UserBannedDoaminEvent'

export class BanUserOnParentUserBannedHandler implements DomainEventSubscriber<UserBannedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): DomainEventClass[] {
    return [UserBannedDomainEvent]
  }

  async on (event: UserBannedDomainEvent): Promise<void> {
    await this.updater.run(
      new MainId(event.mainId),
      new CommunityId(event.communityId)
    )
  }
}
