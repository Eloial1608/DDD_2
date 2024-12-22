import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { DateAt } from './ValueObjects/DateAt'
import { UserIds } from './ValueObjects/UserIds'
import { Content } from './ValueObjects/Content'
import { Nullable } from '@Shared/domain/Nullable'
import { EntityId } from './ValueObjects/EntityId'
import { EntityType } from './ValueObjects/EntityType'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { CommunityId } from './ValueObjects/CommunityId'
import { CalendarCreatedDomainEvent } from './Events/CalendarCreatedDomainEvent'
import { CalendarUpdatedDomainEvent } from './Events/CalendarUpdatedDomainEvent'
import { CalendarDeletedDomainEvent } from './Events/CalendarDeletedDomainEvent'

export class Calendar extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly dateAt: DateAt,
        readonly userIds: UserIds,
        readonly communityId: CommunityId,
        readonly content: Content,
        readonly entityId: Nullable<EntityId>,
        readonly entityType: Nullable<EntityType>,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt
  ) {
    super()
  }

  static create (
    id: Id,
    dateAt: DateAt,
    userIds: UserIds,
    communityId: CommunityId,
    content: Content,
    entityId: Nullable<EntityId>,
    entityType: Nullable<EntityType>
  ): Calendar {
    const calendar = new Calendar(
      id,
      dateAt,
      userIds,
      communityId,
      content,
      entityId,
      entityType,
      new CreatedAt(new Date()),
      new UpdatedAt(new Date())
    )

    calendar.record(CalendarCreatedDomainEvent.fromAggregate(calendar))

    return calendar
  }

  update (
    dateAt: DateAt,
    userIds: UserIds,
    content: Content,
    entityId: Nullable<EntityId>,
    entityType: Nullable<EntityType>
  ): Calendar {
    const calendar = new Calendar(
      this.id,
      dateAt,
      userIds,
      this.communityId,
      content,
      entityId,
      entityType,
      this.createdAt,
      new UpdatedAt(new Date())
    )

    calendar.record(CalendarUpdatedDomainEvent.fromAggregate(calendar))

    return calendar
  }

  delete (): Calendar {
    const calendar = new Calendar(
      this.id,
      this.dateAt,
      this.userIds,
      this.communityId,
      this.content,
      this.entityId,
      this.entityType,
      this.createdAt,
      this.updatedAt
    )

    calendar.record(CalendarDeletedDomainEvent.fromAggregate(calendar))

    return calendar
  }
}
