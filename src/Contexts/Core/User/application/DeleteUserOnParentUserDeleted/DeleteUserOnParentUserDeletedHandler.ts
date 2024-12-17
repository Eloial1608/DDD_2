import { CommunityId } from '@Core/User/domain/ValueObjects/CommunityId'
import { Deleter } from './Deleter'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { MainId } from '@Core/User/domain/ValueObjects/MainId'
import { UserDeletedDomainEvent } from '@Core/User/domain/Events/UserDeletedDomainEvent'

export class DeleteUserOnParentUserDeletedHandler implements DomainEventSubscriber<UserDeletedDomainEvent> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): DomainEventClass[] {
    return [UserDeletedDomainEvent]
  }

  async on (event: UserDeletedDomainEvent): Promise<void> {
    await this.deleter.run(
      new MainId(event.mainId),
      new CommunityId(event.communityId)
    )
  }
}
