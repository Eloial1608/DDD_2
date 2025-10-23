import { DeleteLevelCommand } from '@Core/Level/application/Delete/DeleteLevelCommand'
import { Level } from '@Core/Level/domain/Level'

export class DeleteLevelCommandMother {
  static delete (id: string, communityId: string): DeleteLevelCommand {
    return new DeleteLevelCommand(id, communityId)
  }

  static fromAggregate (level: Level): DeleteLevelCommand {
    return this.delete(
      level.id.valueOf(),
      level.communityId.valueOf()
    )
  }
}
