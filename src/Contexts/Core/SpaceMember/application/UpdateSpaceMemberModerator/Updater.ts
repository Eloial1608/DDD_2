import { SpaceMemberNotFound } from '@Core/SpaceMember/domain/Errors/SpaceMemberNotFound'
import { SpaceMemberRepository } from '@Core/SpaceMember/domain/SpaceMemberRepository'
import { CommunityId } from '@Core/SpaceMember/domain/ValueObjects/CommunityId'
import { Id } from '@Core/SpaceMember/domain/ValueObjects/Id'
import { IsModerator } from '@Core/SpaceMember/domain/ValueObjects/IsModerator'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Updater {
  constructor (private readonly repository: SpaceMemberRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    communityId: CommunityId,
    isModerator: IsModerator
  ) {
    const spaceMember = await this.repository.find(id)

    if (!spaceMember || spaceMember.communityId.valueOf() !== communityId.valueOf()) throw new SpaceMemberNotFound(id)

    const updatedSpaceMember = spaceMember.updateModerator(isModerator)

    await this.repository.persist(updatedSpaceMember)
    await this.eventBus.publish(updatedSpaceMember.pullDomainEvents())
  }
}
