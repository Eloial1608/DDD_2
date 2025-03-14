import { DeleteLikeCommand } from '@Threads/Like/application/Delete/DeleteLikeCommand'
import { Like } from '@Threads/Like/domain/Like'

export class DeleteLikeCommandMother {
  static delete (id: string, userId: string): DeleteLikeCommand {
    return new DeleteLikeCommand(id, userId)
  }

  static fromAggregate (like: Like): DeleteLikeCommand {
    return this.delete(
      like.id.valueOf(),
      like.userId.valueOf()
    )
  }
}
