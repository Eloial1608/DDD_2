import { SpaceMember } from '@Projects/SpaceMember/domain/SpaceMember'
import { SpaceMemberRepository } from '@Projects/SpaceMember/domain/SpaceMemberRepository'
import { Id } from '@Projects/SpaceMember/domain/ValueObjects/Id'
import { IsModerator } from '@Projects/SpaceMember/domain/ValueObjects/IsModerator'
import { SpaceId } from '@Projects/SpaceMember/domain/ValueObjects/SpaceId'
import { UserId } from '@Projects/SpaceMember/domain/ValueObjects/UserId'
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
