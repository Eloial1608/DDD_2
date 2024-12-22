import { DeleteCalendarCommand } from '@Core/Calendar/application/Delete/DeleteCalendarCommand'
import { Calendar } from '@Core/Calendar/domain/Calendar'

export class DeleteCalendarCommandMother {
  static delete (id: string, communityId: string): DeleteCalendarCommand {
    return new DeleteCalendarCommand(id, communityId)
  }

  static fromAggregate (calendar: Calendar): DeleteCalendarCommand {
    return this.delete(
      calendar.id.valueOf(),
      calendar.communityId.valueOf()
    )
  }
}
