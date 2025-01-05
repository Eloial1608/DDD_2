import { DeleteMediaCommand } from '@Media/Media/application/Delete/DeleteMediaCommand'
import { Media } from '@Media/Media/domain/Media'

export class DeleteMediaCommandMother {
  static delete (id: string, communityId: string, userId: string): DeleteMediaCommand {
    return new DeleteMediaCommand(id, communityId, userId)
  }

  static fromAggregate (media: Media): DeleteMediaCommand {
    return this.delete(
      media.id.valueOf(),
      media.communityId.valueOf(),
      media.userId.valueOf()
    )
  }
}
