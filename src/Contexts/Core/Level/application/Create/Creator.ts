import { LevelRepository } from '@Core/Level/domain/LevelRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { LevelAlreadyExistsById } from '@Core/Level/domain/Errors/LevelAlreadyExistsById'
import { Level } from '@Core/Level/domain/Level'
import { CommunityId } from '@Core/Level/domain/ValueObjects/CommunityId'
import { Id } from '@Core/Level/domain/ValueObjects/Id'
import { LevelNumber } from '@Core/Level/domain/ValueObjects/LevelNumber'
import { MinimumExp } from '@Core/Level/domain/ValueObjects/MinimumExp'

export class Creator {
  constructor (private readonly repository: LevelRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    communityId: CommunityId,
    levelNumber: LevelNumber,
    minimumExp: MinimumExp
  ) {
    await this.checkIfExists(id)

    const level = Level.create(
      id,
      communityId,
      levelNumber,
      minimumExp
    )

    await this.repository.persist(level)
    await this.eventBus.publish(level.pullDomainEvents())
  }

  private async checkIfExists (id: Id) {
    const existingById = await this.repository.find(id)

    if (existingById) throw new LevelAlreadyExistsById(id)
  }
}
