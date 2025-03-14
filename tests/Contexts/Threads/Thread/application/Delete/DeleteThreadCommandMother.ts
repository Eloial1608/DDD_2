import { DeleteThreadCommand } from '@Threads/Thread/application/Delete/DeleteThreadCommand'
import { Thread } from '@Threads/Thread/domain/Thread'

export class DeleteThreadCommandMother {
  static delete (id: string, communityId: string, userId: string): DeleteThreadCommand {
    return new DeleteThreadCommand(id, communityId, userId)
  }

  static fromAggregate (thread: Thread): DeleteThreadCommand {
    return this.delete(
      thread.id.valueOf(),
      thread.communityId.valueOf(),
      thread.userId.valueOf()
    )
  }
}
