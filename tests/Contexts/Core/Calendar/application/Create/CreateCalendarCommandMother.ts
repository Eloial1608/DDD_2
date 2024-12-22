import { CreateCalendarCommand } from '@Core/Calendar/application/Create/CreateCalendarCommand'
import { Calendar } from '@Core/Calendar/domain/Calendar'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateCalendarCommandMother {
  static create (
    id: string,
    dateAt: Date,
    userIds: string[],
    communityId: string,
    content: string,
    entityId: Nullable<string>,
    entityType: Nullable<string>
  ): CreateCalendarCommand {
    return new CreateCalendarCommand(
      id,
      dateAt,
      userIds,
      communityId,
      content,
      entityId,
      entityType
    )
  }

  static fromAggregate (calendar: Calendar): CreateCalendarCommand {
    return this.create(
      calendar.id.valueOf(),
      calendar.dateAt.valueOf(),
      calendar.userIds.valueOf(),
      calendar.communityId.valueOf(),
      calendar.content.valueOf(),
      calendar.entityId?.valueOf(),
      calendar.entityType?.valueOf()
    )
  }
}
