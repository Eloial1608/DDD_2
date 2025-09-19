import { UpdateLevelCommand } from '@Core/Level/application/Update/UpdateLevelCommand'
import { Level } from '@Core/Level/domain/Level'

export class UpdateLevelCommandMother {
  static update (
    id: string,
    communityId: string,
    minimumExp: number
  ): UpdateLevelCommand {
    return new UpdateLevelCommand(
      id,
      communityId,
      minimumExp
    )
  }

  static fromAggregate (level: Level): UpdateLevelCommand {
    return this.update(
      level.id.valueOf(),
      level.communityId.valueOf(),
      level.minimumExp.valueOf()
    )
  }
}
