import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { SpaceMemberCreatedDomainEvent } from './Events/SpaceMemberCreatedDomainEvent'
import { CommunityId } from './ValueObjects/CommunityId'
import { SpaceMemberDeletedDomainEvent } from './Events/SpaceMemberDeletedDomainEvent'
import { InvitedBy } from './ValueObjects/InvitedBy'
import { SpaceId } from './ValueObjects/SpaceId'
import { UserId } from './ValueObjects/UserId'
import { InvitedAt } from './ValueObjects/InvitedAt'
import { IsModerator } from './ValueObjects/IsModerator'
import { IsBanned } from './ValueObjects/IsBanned'

export class SpaceMember extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly userId: UserId,
        readonly spaceId: SpaceId,
        readonly communityId: CommunityId,
        readonly invitedBy: Nullable<InvitedBy>,
        readonly invitedAt: Nullable<InvitedAt>,
        readonly isModerator: IsModerator,
        readonly isBanned: IsBanned,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt,
        readonly deletedAt: Nullable<DeletedAt>

  ) {
    super()
  }

  static create (
    id: Id,
    userId: UserId,
    spaceId: SpaceId,
    communityId: CommunityId,
    invitedBy: Nullable<InvitedBy>,
    invitedAt: Nullable<InvitedAt>,
    isModerator: IsModerator
  ): SpaceMember {
    const spacemember = new SpaceMember(
      id,
      userId,
      spaceId,
      communityId,
      invitedBy,
      invitedAt,
      isModerator,
      new IsBanned(false),
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
      null
    )

    spacemember.record(SpaceMemberCreatedDomainEvent.fromAggregate(spacemember))

    return spacemember
  }

  delete (): SpaceMember {
    const spacemember = new SpaceMember(
      this.id,
      this.userId,
      this.spaceId,
      this.communityId,
      this.invitedBy,
      this.invitedAt,
      this.isModerator,
      this.isBanned,
      this.createdAt,
      this.updatedAt,
      new DeletedAt(new Date())
    )

    spacemember.record(SpaceMemberDeletedDomainEvent.fromAggregate(spacemember))

    return spacemember
  }
}
