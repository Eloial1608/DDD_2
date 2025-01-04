import { CreateCommentCommand } from '@Posts/Comment/application/Create/CreateCommentCommand'
import { Comment } from '@Posts/Comment/domain/Comment'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateCommentCommandMother {
  static create (
    id: string,
    postId: string,
    userId: string,
    author: {
      id: string,
      mainId: string,
      name: string,
      username: string,
      pictureUrl: Nullable<string>,
      bannerUrl: Nullable<string>
    },
    content: string
  ): CreateCommentCommand {
    return new CreateCommentCommand(
      id,
      postId,
      userId,
      author,
      content
    )
  }

  static fromAggregate (comment: Comment): CreateCommentCommand {
    return this.create(
      comment.id.valueOf(),
      comment.postId.valueOf(),
      comment.userId.valueOf(),
      comment.author.toPrimitives(),
      comment.content.valueOf()
    )
  }
}
