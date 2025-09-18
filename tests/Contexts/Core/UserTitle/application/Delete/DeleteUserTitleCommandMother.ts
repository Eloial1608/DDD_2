import { DeleteUserTitleCommand } from '@Core/UserTitle/application/Delete/DeleteUserTitleCommand'
import { UserTitle } from '@Core/UserTitle/domain/UserTitle'

export class DeleteUserTitleCommandMother {
  static delete (id: string, communityId: string): DeleteUserTitleCommand {
    return new DeleteUserTitleCommand(id, communityId)
  }

  static fromAggregate (userTitle: UserTitle): DeleteUserTitleCommand {
    return this.delete(
      userTitle.id.valueOf(),
      userTitle.communityId.valueOf()
    )
  }
}
