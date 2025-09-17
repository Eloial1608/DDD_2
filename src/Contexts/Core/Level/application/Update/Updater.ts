import { PlanNotFound } from '@Core/Plan/domain/Errors/PlanNotFound'
import { LevelRepository } from '@Core/Level/domain/LevelRepository'
import { CommunityId } from '@Core/Level/domain/ValueObjects/CommunityId'
import { Id } from '@Core/Level/domain/ValueObjects/Id'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { MinimumExp } from '@Core/Level/domain/ValueObjects/MinimumExp'

export class Updater {
  constructor (private readonly repository: LevelRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    communityId: CommunityId,
    minimumExp: MinimumExp
  ) {
    const level = await this.repository.find(id)

    if (!level || level.communityId.valueOf() !== communityId.valueOf()) throw new PlanNotFound(id)

    const updatedLevel = await level.update(
      minimumExp
    )

    await this.repository.persist(updatedLevel)

    await this.eventBus.publish(updatedLevel.pullDomainEvents())
  }
}
