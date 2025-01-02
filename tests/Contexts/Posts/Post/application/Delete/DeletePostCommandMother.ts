import { DeletePostCommand } from '@Posts/Post/application/Delete/DeletePostCommand'
import { Post } from '@Posts/Post/domain/Post'

export class DeletePostCommandMother {
  static delete (id: string, communityId: string, userId: string): DeletePostCommand {
    return new DeletePostCommand(id, communityId, userId)
  }

  static fromAggregate (post: Post): DeletePostCommand {
    return this.delete(
      post.id.valueOf(),
      post.communityId.valueOf(),
      post.userId.valueOf()
    )
  }
}
