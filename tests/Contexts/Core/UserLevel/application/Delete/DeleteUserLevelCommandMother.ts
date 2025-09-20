import { DeleteUserLevelCommand } from '@Core/UserLevel/application/Delete/DeleteUserLevelCommand'
import { UserLevel } from '@Core/UserLevel/domain/UserLevel'

export class DeleteUserLevelCommandMother {
  static delete (id: string, communityId: string): DeleteUserLevelCommand {
    return new DeleteUserLevelCommand(id, communityId)
  }

  static fromAggregate (userlevel: UserLevel): DeleteUserLevelCommand {
    return this.delete(
      userlevel.id.valueOf(),
      userlevel.communityId.valueOf()
    )
  }
}
