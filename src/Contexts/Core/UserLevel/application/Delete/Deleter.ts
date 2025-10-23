import { Id } from '@Core/UserLevel/domain/ValueObjects/Id'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Core/UserLevel/domain/ValueObjects/CommunityId'
import { UserLevelRepository } from '@Core/UserLevel/domain/UserLevelRepository'
export class Deleter {
  constructor (private readonly repository: UserLevelRepository, private readonly eventBus: EventBus) {}

  async run (id: Id, communityId: CommunityId): Promise<void> {
    const existingUserLevel = await this.repository.find(id)
    if (!existingUserLevel || existingUserLevel.communityId.valueOf() !== communityId.valueOf()) return

    const userlevel = existingUserLevel.delete()

    await this.repository.delete(userlevel)

    await this.eventBus.publish(userlevel.pullDomainEvents())
  }
}
