import { UserLevelRepository } from '@Core/UserLevel/domain/UserLevelRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { UserLevelAlreadyExistsById } from '@Core/UserLevel/domain/Errors/UserLevelAlreadyExistsById'
import { UserLevel } from '@Core/UserLevel/domain/UserLevel'
import { CommunityId } from '@Core/UserLevel/domain/ValueObjects/CommunityId'
import { Id } from '@Core/UserLevel/domain/ValueObjects/Id'
import { UserId } from '@Core/UserLevel/domain/ValueObjects/UserId'
import { CurrentExp } from '@Core/UserLevel/domain/ValueObjects/CurrentExp'
import { LevelId } from '@Core/UserLevel/domain/ValueObjects/LevelId'

export class Creator {
  constructor (private readonly repository: UserLevelRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    communityId: CommunityId,
    userId: UserId,
    levelId: LevelId,
    currentExp: CurrentExp
  ) {
    await this.checkIfExists(id)

    const userLevel = UserLevel.create(
      id,
      communityId,
      userId,
      levelId,
      currentExp
    )

    await this.repository.persist(userLevel)
    await this.eventBus.publish(userLevel.pullDomainEvents())
  }

  private async checkIfExists (id: Id) {
    const existingById = await this.repository.find(id)

    if (existingById) throw new UserLevelAlreadyExistsById(id)
  }
}
