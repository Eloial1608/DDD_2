import { DeleteContentCommand } from '@Media/Content/application/Delete/DeleteContentCommand'
import { Content } from '@Media/Content/domain/Content'

export class DeleteContentCommandMother {
  static delete (id: string, communityId: string): DeleteContentCommand {
    return new DeleteContentCommand(id, communityId)
  }

  static fromAggregate (content: Content): DeleteContentCommand {
    return this.delete(
      content.id.valueOf(),
      content.communityId.valueOf()
    )
  }
}
