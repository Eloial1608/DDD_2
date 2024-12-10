import { Id } from '@Core/SpaceMember/domain/ValueObjects/Id'
import { SpaceMemberRepository } from '@Core/SpaceMember/domain/SpaceMemberRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { CommunityId } from '@Core/SpaceMember/domain/ValueObjects/CommunityId'
export class Deleter {
  constructor (private readonly repository: SpaceMemberRepository, private readonly eventBus: EventBus) {}

  async run (id: Id, communityId: CommunityId): Promise<void> {
    const existingSpaceMember = await this.repository.find(id)
    if (!existingSpaceMember || existingSpaceMember.communityId.valueOf() !== communityId.valueOf()) return

    const spacemember = existingSpaceMember.delete()

    await this.repository.persist(spacemember)

    await this.eventBus.publish(spacemember.pullDomainEvents())
  }
}
