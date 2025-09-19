import { LevelRepository } from '@Core/Level/domain/LevelRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { LevelAlreadyExistsById } from '@Core/Level/domain/Errors/LevelAlreadyExistsById'
import { Level } from '@Core/Level/domain/Level'
import { CommunityId } from '@Core/Level/domain/ValueObjects/CommunityId'
import { Id } from '@Core/Level/domain/ValueObjects/Id'
import { LevelNumber } from '@Core/Level/domain/ValueObjects/LevelNumber'
import { MinimumExp } from '@Core/Level/domain/ValueObjects/MinimumExp'
import { LevelAlreadyExistsByNumber } from '@Core/Level/domain/Errors/LevelAlreadyExistsByNumber'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'

export class Creator {
  constructor (private readonly repository: LevelRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    communityId: CommunityId,
    levelNumber: LevelNumber,
    minimumExp: MinimumExp
  ) {
    await this.checkIfExists(id)
    await this.checkIfExistsByLevelNumber(levelNumber, communityId)

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

  private async checkIfExistsByLevelNumber (levelNumber: LevelNumber, communityId: CommunityId) {
    const existingByLevelNumber = (await this.repository.search(
      new Criteria(
        new Filters([
          Filter.simple('levelNumber', '=', levelNumber.valueOf()),
          Filter.simple('communityId', '=', communityId.valueOf())
        ])
      )
    )).pop()

    if (existingByLevelNumber) throw new LevelAlreadyExistsByNumber(levelNumber)
  }
}
