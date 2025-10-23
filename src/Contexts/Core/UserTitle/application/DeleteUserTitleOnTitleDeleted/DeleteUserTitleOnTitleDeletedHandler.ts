import { Deleter } from './Deleter'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { TitleDeletedDomainEvent } from '@Core/Title/domain/Events/TitleDeletedDomainEvent'
import { TitleId } from '@Core/UserTitle/domain/ValueObjects/TitleId'

export class DeleteUserTitleOnTitleDeletedHandler implements DomainEventSubscriber<TitleDeletedDomainEvent> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): DomainEventClass[] {
    return [TitleDeletedDomainEvent]
  }

  async on (event: TitleDeletedDomainEvent): Promise<void> {
    await this.deleter.run(
      new TitleId(event.id)
    )
  }
}
