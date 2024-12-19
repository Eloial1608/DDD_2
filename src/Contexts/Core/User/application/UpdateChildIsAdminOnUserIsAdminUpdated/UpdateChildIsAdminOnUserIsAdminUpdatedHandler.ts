import { CommunityId } from '@Core/User/domain/ValueObjects/CommunityId'
import { Updater } from './Updater'
import { IsAdmin } from '@Core/User/domain/ValueObjects/IsAdmin'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { UserUpdatedIsAdminDomainEvent } from '@Core/User/domain/Events/UserUpdatedIsAdminEvent'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { MainId } from '@Core/User/domain/ValueObjects/MainId'

export class UpdateChildIsAdminOnUserIsAdminUpdatedHandler implements DomainEventSubscriber<UserUpdatedIsAdminDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): DomainEventClass[] {
    return [UserUpdatedIsAdminDomainEvent]
  }

  async on (event: UserUpdatedIsAdminDomainEvent): Promise<void> {
    await this.updater.run(
      new MainId(event.mainId),
      new CommunityId(event.communityId),
      new IsAdmin(event.isAdmin)
    )
  }
}
