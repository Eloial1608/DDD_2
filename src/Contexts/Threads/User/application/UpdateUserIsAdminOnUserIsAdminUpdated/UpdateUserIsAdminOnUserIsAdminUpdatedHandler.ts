import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Id } from '@Threads/User/domain/ValueObjects/Id'
import { UserUpdatedIsAdminDomainEvent } from '@Core/User/domain/Events/UserUpdatedIsAdminEvent'
import { IsAdmin } from '@Threads/User/domain/ValueObjects/IsAdmin'

export class UpdateUserIsAdminOnUserIsAdminUpdatedHandler implements DomainEventSubscriber <UserUpdatedIsAdminDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [UserUpdatedIsAdminDomainEvent]
  }

  async on (domainEvent: UserUpdatedIsAdminDomainEvent): Promise<void> {
    await this.updater.run(
      new Id(domainEvent.id),
      new IsAdmin(domainEvent.isAdmin)
    )
  }
}
