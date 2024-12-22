import { Id } from '@Core/Calendar/domain/ValueObjects/Id'
import { CalendarRepository } from '@Core/Calendar/domain/CalendarRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { DateAt } from '@Core/Calendar/domain/ValueObjects/DateAt'
import { UserIds } from '@Core/Calendar/domain/ValueObjects/UserIds'
import { CommunityId } from '@Core/Calendar/domain/ValueObjects/CommunityId'
import { Content } from '@Core/Calendar/domain/ValueObjects/Content'
import { EntityId } from '@Core/Calendar/domain/ValueObjects/EntityId'
import { Nullable } from '@Shared/domain/Nullable'
import { EntityType } from '@Core/Calendar/domain/ValueObjects/EntityType'
import { Calendar } from '@Core/Calendar/domain/Calendar'

type Params = {
    id: Id,
    dateAt: DateAt,
    userIds: UserIds,
    communityId: CommunityId,
    content: Content,
    entityId: Nullable<EntityId>,
    entityType: Nullable<EntityType>
}

export class Creator {
  constructor (private readonly repository: CalendarRepository, private readonly eventBus: EventBus) {}

  async run (params: Params): Promise<void> {
    const existingCalendar = await this.repository.find(params.id)

    if (existingCalendar) return

    const calendar = Calendar.create(
      params.id,
      params.dateAt,
      params.userIds,
      params.communityId,
      params.content,
      params.entityId,
      params.entityType
    )

    await this.repository.persist(calendar)

    await this.eventBus.publish(calendar.pullDomainEvents())
  }
}
