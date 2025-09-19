import { CreateLevelCommand } from '@Core/Level/application/Create/CreateLevelCommand'
import { Level } from '@Core/Level/domain/Level'

export class CreateLevelCommandMother {
  static create (
    id: string,
    communityId: string,
    levelNumber: number,
    minimumExp: number
  ): CreateLevelCommand {
    return new CreateLevelCommand(
      id,
      communityId,
      levelNumber,
      minimumExp
    )
  }

  static fromAggregate (level: Level): CreateLevelCommand {
    return this.create(
      level.id.valueOf(),
      level.communityId.valueOf(),
      level.levelNumber.valueOf(),
      level.minimumExp.valueOf()
    )
  }
}
