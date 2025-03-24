import { CreateCommentCommand } from '@Course/Comment/application/Create/CreateCommentCommand'
import { Comment } from '@Course/Comment/domain/Comment'

export class CreateCommentCommandMother {
  static create (
    id: string,
    courseId: string,
    userId: string,
    content: string
  ): CreateCommentCommand {
    return new CreateCommentCommand(
      id,
      courseId,
      userId,
      content
    )
  }

  static fromAggregate (comment: Comment): CreateCommentCommand {
    return this.create(
      comment.id.valueOf(),
      comment.courseId.valueOf(),
      comment.userId.valueOf(),
      comment.content.valueOf()
    )
  }
}
