import { CreateCommentCommand } from '@Media/Comment/application/Create/CreateCommentCommand'
import { Comment } from '@Media/Comment/domain/Comment'

export class CreateCommentCommandMother {
  static create (
    id: string,
    mediaId: string,
    userId: string,
    content: string
  ): CreateCommentCommand {
    return new CreateCommentCommand(
      id,
      mediaId,
      userId,
      content
    )
  }

  static fromAggregate (comment: Comment): CreateCommentCommand {
    return this.create(
      comment.id.valueOf(),
      comment.mediaId.valueOf(),
      comment.userId.valueOf(),
      comment.content.valueOf()
    )
  }
}
