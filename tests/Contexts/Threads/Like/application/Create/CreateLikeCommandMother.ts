import { CreateLikeCommand } from '@Threads/Like/application/Create/CreateLikeCommand'
import { Like } from '@Threads/Like/domain/Like'

export class CreateLikeCommandMother {
  static create (
    id: string,
    threadId: string,
    userId: string
  ): CreateLikeCommand {
    return new CreateLikeCommand(
      id,
      threadId,
      userId
    )
  }

  static fromAggregate (like: Like): CreateLikeCommand {
    return this.create(
      like.id.valueOf(),
      like.threadId.valueOf(),
      like.userId.valueOf()
    )
  }
}
