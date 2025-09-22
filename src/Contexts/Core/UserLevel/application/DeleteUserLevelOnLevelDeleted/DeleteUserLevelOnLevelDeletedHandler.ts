import { Deleter } from './Deleter'
import { DomainEventSubscriber } from '@Shared/domain/EventBus/DomainEventSubscriber'
import { DomainEventClass } from '@Shared/domain/EventBus/DomainEvent'
import { LevelDeletedDomainEvent } from '@Core/Level/domain/Events/LevelDeletedDomainEvent'
import { LevelId } from '@Core/UserLevel/domain/ValueObjects/LevelId'

export class DeleteUserLevelOnLevelDeletedHandler implements DomainEventSubscriber<LevelDeletedDomainEvent> {
  constructor (private readonly deleter: Deleter) {}

  subscribedTo (): DomainEventClass[] {
    return [LevelDeletedDomainEvent]
  }

  async on (event: LevelDeletedDomainEvent): Promise<void> {
    await this.deleter.run(
      new LevelId(event.id)
    )
  }
}
