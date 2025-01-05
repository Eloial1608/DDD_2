import { UpdateCommentCommand } from '@Media/Comment/application/Update/UpdateCommentCommand'
import { Comment } from '@Media/Comment/domain/Comment'

export class UpdateCommentCommandMother {
  static update (
    id: string,
    userId: string,
    content: string
  ): UpdateCommentCommand {
    return new UpdateCommentCommand(
      id,
      userId,
      content
    )
  }

  static fromAggregate (comment: Comment): UpdateCommentCommand {
    return this.update(
      comment.id.valueOf(),
      comment.userId.valueOf(),
      comment.content.valueOf()
    )
  }
}
