import { Id } from '@Core/Calendar/domain/ValueObjects/Id'
import { CalendarRepository } from '@Core/Calendar/domain/CalendarRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Core/Calendar/domain/ValueObjects/CommunityId'
import { CalendarNotFound } from '@Core/Calendar/domain/Errors/CalendarNotFound'
export class Deleter {
  constructor (private readonly repository: CalendarRepository, private readonly eventBus: EventBus) {}

  async run (id: Id, communityId: CommunityId): Promise<void> {
    const existingCalendar = await this.repository.find(id)

    if (!existingCalendar || existingCalendar.communityId.valueOf() !== communityId.valueOf()) throw new CalendarNotFound(id)

    const calendar = existingCalendar.delete()

    await this.repository.delete(calendar)

    await this.eventBus.publish(calendar.pullDomainEvents())
  }
}
