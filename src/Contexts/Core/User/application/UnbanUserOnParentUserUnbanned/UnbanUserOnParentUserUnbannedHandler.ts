import { CommunityId } from '@Core/User/domain/ValueObjects/CommunityId'
import { Updater } from './Updater'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { MainId } from '@Core/User/domain/ValueObjects/MainId'
import { UserUnbannedDomainEvent } from '@Core/User/domain/Events/UserUnbannedDomainEvent'

export class UnbanUserOnParentUserUnbannedHandler implements DomainEventSubscriber<UserUnbannedDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): DomainEventClass[] {
    return [UserUnbannedDomainEvent]
  }

  async on (event: UserUnbannedDomainEvent): Promise<void> {
    await this.updater.run(
      new MainId(event.mainId),
      new CommunityId(event.communityId)
    )
  }
}
