import { CreateCommentCommand } from '@Posts/Comment/application/Create/CreateCommentCommand'
import { Comment } from '@Posts/Comment/domain/Comment'

export class CreateCommentCommandMother {
  static create (
    id: string,
    postId: string,
    userId: string,
    content: string
  ): CreateCommentCommand {
    return new CreateCommentCommand(
      id,
      postId,
      userId,
      content
    )
  }

  static fromAggregate (comment: Comment): CreateCommentCommand {
    return this.create(
      comment.id.valueOf(),
      comment.postId.valueOf(),
      comment.userId.valueOf(),
      comment.content.valueOf()
    )
  }
}
