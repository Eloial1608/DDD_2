import { DeleteTitleCommand } from '@Core/Title/application/Delete/DeleteTitleCommand'
import { Title } from '@Core/Title/domain/Title'

export class DeleteTitleCommandMother {
  static delete (id: string, communityId: string): DeleteTitleCommand {
    return new DeleteTitleCommand(id, communityId)
  }

  static fromAggregate (title: Title): DeleteTitleCommand {
    return this.delete(
      title.id.valueOf(),
      title.communityId.valueOf()
    )
  }
}
