import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { CommunityId } from './ValueObjects/CommunityId'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { Id } from './ValueObjects/Id'
import { TitleId } from './ValueObjects/TitleId'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { UserId } from './ValueObjects/UserId'
import { UserTitleCreatedDomainEvent } from './Events/UserTitleCreatedDomainEvent'
import { UserTitleUpdatedDomainEvent } from './Events/UserTitleUpdatedDomainEvent'
import { UserTitleDeletedDomainEvent } from './Events/UserTitleDeletedDomainEvent'

export class UserTitle extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly communityId: CommunityId,
        readonly titleId: TitleId,
        readonly userId: UserId,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt
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
      new UpdatedAt(new Date())
    )

    userTitle.record(UserTitleCreatedDomainEvent.fromAggregate(userTitle))

    return userTitle
  }

  update (
    id: Id

  ): UserTitle {
    const userTitle = new UserTitle(
      id,
      this.communityId,
      this.titleId,
      this.userId,
      this.createdAt,
      new UpdatedAt(new Date())
    )

    userTitle.record(UserTitleUpdatedDomainEvent.fromAggregate(userTitle))

    return userTitle
  }

  delete (): UserTitle {
    const userTitle = new UserTitle(
      this.id,
      this.communityId,
      this.titleId,
      this.userId,
      this.createdAt,
      this.updatedAt
    )

    userTitle.record(UserTitleDeletedDomainEvent.fromAggregate(userTitle))

    return userTitle
  }
}
