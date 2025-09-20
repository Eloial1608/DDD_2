import { Deleter } from './Deleter'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { UserId } from '@Core/UserLevel/domain/ValueObjects/UserId'
import { UserDeletedDomainEvent } from '@Core/User/domain/Events/UserDeletedDomainEvent'

export class DeleteUserLevelOnUserDeletedHandler implements DomainEventSubscriber<UserDeletedDomainEvent> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): DomainEventClass[] {
    return [UserDeletedDomainEvent]
  }

  async on (event: UserDeletedDomainEvent): Promise<void> {
    await this.deleter.run(
      new UserId(event.id)
    )
  }
}
