import { SpaceMember } from '@Course/SpaceMember/domain/SpaceMember'
import { SpaceMemberRepository } from '@Course/SpaceMember/domain/SpaceMemberRepository'
import { Id } from '@Course/SpaceMember/domain/ValueObjects/Id'
import { IsModerator } from '@Course/SpaceMember/domain/ValueObjects/IsModerator'
import { SpaceId } from '@Course/SpaceMember/domain/ValueObjects/SpaceId'
import { UserId } from '@Course/SpaceMember/domain/ValueObjects/UserId'
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
