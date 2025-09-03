import { Id } from '@Core/Space/domain/ValueObjects/Id'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Core/Space/domain/ValueObjects/CommunityId'
import { SpaceUserTitleRepository } from '@Core/SpaceUserTitle/domain/SpaceUserTitleRepository'
export class Deleter {
  constructor (private readonly repository: SpaceUserTitleRepository, private readonly eventBus: EventBus) {}

  async run (id: Id, communityId: CommunityId): Promise<void> {
    const existingSpace = await this.repository.find(id)
    if (!existingSpace || existingSpace.communityId.valueOf() !== communityId.valueOf()) return

    const space = existingSpace.delete()

    await this.repository.persist(space)

    await this.eventBus.publish(space.pullDomainEvents())
  }
}
