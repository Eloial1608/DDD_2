import { Id } from '@Events/Event/domain/ValueObjects/Id'
import { EventRepository } from '@Events/Event/domain/EventRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Events/Event/domain/ValueObjects/CommunityId'
import { UserId } from '@Events/Event/domain/ValueObjects/UserId'
import { NotAllowedToPersistEvent } from '@Events/Event/domain/Errors/NotAllowedToPersistEvent'
export class Deleter {
  constructor (private readonly repository: EventRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    communityId: CommunityId,
    userId: UserId
  ): Promise<void> {
    const existingEvent = await this.repository.find(id)
    if (!existingEvent || existingEvent.communityId.valueOf() !== communityId.valueOf()) return

    if (existingEvent.userId.valueOf() !== userId.valueOf()) throw new NotAllowedToPersistEvent(id)

    const event = existingEvent.delete()

    await this.repository.persist(event)

    await this.eventBus.publish(event.pullDomainEvents())
  }
}
