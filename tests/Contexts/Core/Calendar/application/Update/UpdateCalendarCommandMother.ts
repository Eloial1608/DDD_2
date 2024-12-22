import { UpdateCalendarCommand } from '@Core/Calendar/application/Update/UpdateCalendarCommand'
import { Calendar } from '@Core/Calendar/domain/Calendar'
import { Nullable } from '@Shared/domain/Nullable'

export class UpdateCalendarCommandMother {
  static create (
    id: string,
    dateAt: Date,
    userIds: string[],
    communityId: string,
    content: string,
    entityId: Nullable<string>,
    entityType: Nullable<string>
  ): UpdateCalendarCommand {
    return new UpdateCalendarCommand(
      id,
      dateAt,
      userIds,
      communityId,
      content,
      entityId,
      entityType
    )
  }

  static fromAggregate (calendar: Calendar): UpdateCalendarCommand {
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
