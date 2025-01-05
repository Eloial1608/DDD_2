import { CreateLikeCommand } from '@Media/Like/application/Create/CreateLikeCommand'
import { Like } from '@Media/Like/domain/Like'

export class CreateLikeCommandMother {
  static create (
    id: string,
    mediaId: string,
    userId: string
  ): CreateLikeCommand {
    return new CreateLikeCommand(
      id,
      mediaId,
      userId
    )
  }

  static fromAggregate (like: Like): CreateLikeCommand {
    return this.create(
      like.id.valueOf(),
      like.mediaId.valueOf(),
      like.userId.valueOf()
    )
  }
}
