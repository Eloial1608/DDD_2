import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { CommunityId } from './ValueObjects/CommunityId'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { Id } from './ValueObjects/Id'
import { TitleId } from './ValueObjects/TitleId'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { UserId } from './ValueObjects/UserId'
import { UserTitleCreatedDomainEvent } from './Events/UserTitleCreatedDomainEvent'
import { UserTitleDeletedDomainEvent } from './Events/UserTitleDeletedDomainEvent'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { Nullable } from '@Shared/domain/Nullable'

export class UserTitle extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly communityId: CommunityId,
        readonly titleId: TitleId,
        readonly userId: UserId,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt,
        readonly deletedAt?: Nullable<DeletedAt>
  ) {
    super()
  }

  static create (
    id: Id,
    communityId: CommunityId,
    titleId: TitleId,
    userId: UserId
  ): UserTitle {
    const userTitle = new UserTitle(
      id,
      communityId,
      titleId,
      userId,
      new CreatedAt(new Date()),
      new UpdatedAt(new Date()),
      null
    )

    userTitle.record(UserTitleCreatedDomainEvent.fromAggregate(userTitle))

    return userTitle
  }

  delete (): UserTitle {
    const userTitle = new UserTitle(
      this.id,
      this.communityId,
      this.titleId,
      this.userId,
      this.createdAt,
      this.updatedAt,
      new DeletedAt(new Date())
    )

    userTitle.record(UserTitleDeletedDomainEvent.fromAggregate(userTitle))

    return userTitle
  }
}
