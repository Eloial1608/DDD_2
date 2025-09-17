import { Id } from '@Core/Level/domain/ValueObjects/Id'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Core/Level/domain/ValueObjects/CommunityId'
import { LevelRepository } from '@Core/Level/domain/LevelRepository'
export class Deleter {
  constructor (private readonly repository: LevelRepository, private readonly eventBus: EventBus) {}

  async run (id: Id, communityId: CommunityId): Promise<void> {
    const existingLevel = await this.repository.find(id)
    if (!existingLevel || existingLevel.communityId.valueOf() !== communityId.valueOf()) return

    const level = existingLevel.delete()

    await this.repository.persist(level)

    await this.eventBus.publish(level.pullDomainEvents())
  }
}
