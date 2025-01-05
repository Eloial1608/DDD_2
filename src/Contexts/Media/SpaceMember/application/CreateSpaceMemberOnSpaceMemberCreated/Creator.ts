import { SpaceMember } from '@Media/SpaceMember/domain/SpaceMember'
import { SpaceMemberRepository } from '@Media/SpaceMember/domain/SpaceMemberRepository'
import { Id } from '@Media/SpaceMember/domain/ValueObjects/Id'
import { IsModerator } from '@Media/SpaceMember/domain/ValueObjects/IsModerator'
import { SpaceId } from '@Media/SpaceMember/domain/ValueObjects/SpaceId'
import { UserId } from '@Media/SpaceMember/domain/ValueObjects/UserId'
import { EventBus } from '@Shared/domain/EventBus/EventBus'

export class Creator {
  constructor (private readonly repository: SpaceMemberRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    spaceId: SpaceId,
    userId: UserId,
    isModerator: IsModerator
  ) {
    const spaceMember = await this.repository.find(id)

    if (spaceMember) return

    const createdSpaceMember = SpaceMember.create(
      id,
      spaceId,
      userId,
      isModerator
    )

    await this.repository.persist(createdSpaceMember)
    await this.eventBus.publish(createdSpaceMember.pullDomainEvents())
  }
}
