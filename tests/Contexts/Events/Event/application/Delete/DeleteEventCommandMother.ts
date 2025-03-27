import { DeleteEventCommand } from '@Events/Event/application/Delete/DeleteEventCommand'
import { Event } from '@Events/Event/domain/Event'

export class DeleteEventCommandMother {
  static delete (id: string, communityId: string, userId: string): DeleteEventCommand {
    return new DeleteEventCommand(id, communityId, userId)
  }

  static fromAggregate (event: Event): DeleteEventCommand {
    return this.delete(
      event.id.valueOf(),
      event.communityId.valueOf(),
      event.userId.valueOf()
    )
  }
}
