import { DeleteUserCommand } from '@Core/User/application/Delete/DeleteUserCommand'
import { User } from '@Core/User/domain/User'

export class DeleteUserCommandMother {
  static delete (id: string, communityId: string): DeleteUserCommand {
    return new DeleteUserCommand(id, communityId)
  }

  static fromAggregate (user: User): DeleteUserCommand {
    return this.delete(
      user.id.valueOf(),
      user.communityId.valueOf()
    )
  }
}
