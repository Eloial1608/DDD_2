import { CreateLikeCommand } from '@Posts/Like/application/Create/CreateLikeCommand'
import { Like } from '@Posts/Like/domain/Like'

export class CreateLikeCommandMother {
  static create (
    id: string,
    postId: string,
    userId: string
  ): CreateLikeCommand {
    return new CreateLikeCommand(
      id,
      postId,
      userId
    )
  }

  static fromAggregate (like: Like): CreateLikeCommand {
    return this.create(
      like.id.valueOf(),
      like.postId.valueOf(),
      like.userId.valueOf()
    )
  }
}
