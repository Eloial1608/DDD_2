import { CreateUserLevelCommand } from '@Core/UserLevel/application/Create/CreateUserLevelCommand'
import { UserLevel } from '@Core/UserLevel/domain/UserLevel'

export class CreateUserLevelCommandMother {
  static create (
    id: string,
    communityId: string,
    userId: string,
    levelId: string,
    currentExp: number
  ): CreateUserLevelCommand {
    return new CreateUserLevelCommand(
      id,
      communityId,
      userId,
      levelId,
      currentExp
    )
  }

  static fromAggregate (userLevel: UserLevel): CreateUserLevelCommand {
    return this.create(
      userLevel.id.valueOf(),
      userLevel.communityId.valueOf(),
      userLevel.userId.valueOf(),
      userLevel.levelId.valueOf(),
      userLevel.currentExp.valueOf()
    )
  }
}
