import { SpaceMemberRepository } from '@Core/SpaceMember/domain/SpaceMemberRepository'
import { EventBus } from '@Shared/domain/EventBus/EventBus'
import { Nullable } from '@Shared/domain/Nullable'
import { SpaceMember } from '@Core/SpaceMember/domain/SpaceMember'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { CommunityId } from '@Core/SpaceMember/domain/ValueObjects/CommunityId'
import { Id } from '@Core/SpaceMember/domain/ValueObjects/Id'
import { UserId } from '@Core/SpaceMember/domain/ValueObjects/UserId'
import { SpaceId } from '@Core/SpaceMember/domain/ValueObjects/SpaceId'
import { InvitedBy } from '@Core/SpaceMember/domain/ValueObjects/InvitedBy'
import { InvitedAt } from '@Core/SpaceMember/domain/ValueObjects/InvitedAt'
import { IsModerator } from '@Core/SpaceMember/domain/ValueObjects/IsModerator'

export class Creator {
  constructor (private readonly repository: SpaceMemberRepository, private readonly eventBus: EventBus) {}

  async run (
    id: Id,
    userId: UserId,
    spaceId: SpaceId,
    communityId: CommunityId,
    invitedBy: Nullable<InvitedBy>,
    invitedAt: Nullable<InvitedAt>,
    isModerator: IsModerator
  ) {
    await this.getSpaceMember(userId, spaceId, communityId)

    const spacemember = SpaceMember.create(
      id,
      userId,
      spaceId,
      communityId,
      invitedBy,
      invitedAt,
      isModerator
    )

    await this.repository.persist(spacemember)
    await this.eventBus.publish(spacemember.pullDomainEvents())
  }

  private async getSpaceMember (userId: UserId, spaceId: SpaceId, communityId: CommunityId): Promise<Nullable<SpaceMember>> {
    return (await this.repository.search(
      new Criteria(
        new Filters([
          Filter.simple('userId', '=', userId.valueOf()),
          Filter.simple('spaceId', '=', spaceId.valueOf()),
          Filter.simple('communityId', '=', communityId.valueOf())
        ])
      )
    )).pop()
  }
}
