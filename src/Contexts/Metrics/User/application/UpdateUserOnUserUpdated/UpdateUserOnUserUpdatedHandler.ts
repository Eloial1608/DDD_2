import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { Updater } from './Updater'
import { Id } from '@Metrics/User/domain/ValueObjects/Id'
import { Name } from '@Metrics/User/domain/ValueObjects/Name'
import { Username } from '@Metrics/User/domain/ValueObjects/Username'
import { UserUpdatedAboutAndNameDomainEvent } from '@Core/User/domain/Events/UserUpdatedAboutAndNameEvent'

export class UpdateUserOnUserUpdatedHandler implements DomainEventSubscriber <UserUpdatedAboutAndNameDomainEvent> {
  constructor (private readonly updater: Updater) {}

  subscribedTo (): Array<DomainEventClass> {
    return [UserUpdatedAboutAndNameDomainEvent]
  }

  async on (domainEvent: UserUpdatedAboutAndNameDomainEvent): Promise<void> {
    await this.updater.run(
      new Id(domainEvent.id),
      new Name(domainEvent.name),
      new Username(domainEvent.username),
    )
  }
}
