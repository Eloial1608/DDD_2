import { DeleteCommentCommand } from '@Course/Comment/application/Delete/DeleteCommentCommand'
import { Comment } from '@Course/Comment/domain/Comment'

export class DeleteCommentCommandMother {
  static delete (id: string, userId: string): DeleteCommentCommand {
    return new DeleteCommentCommand(id, userId)
  }

  static fromAggregate (comment: Comment): DeleteCommentCommand {
    return this.delete(
      comment.id.valueOf(),
      comment.userId.valueOf()
    )
  }
}
