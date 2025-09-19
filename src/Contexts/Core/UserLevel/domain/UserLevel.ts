import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from '@Core/UserLevel/domain/ValueObjects/Id'
import { CreatedAt } from '@Core/UserLevel/domain/ValueObjects/CreatedAt'
import { UserLevelCreatedDomainEvent } from './Events/UserLevelCreatedDomainEvent'
import { CommunityId } from '@Core/UserLevel/domain/ValueObjects/CommunityId'
import { CurrentExp } from './ValueObjects/CurrentExp'
import { UserLevelDeletedDomainEvent } from './Events/UserLevelDeletedDomainEvent'
import { UserId } from './ValueObjects/UserId'

export class UserLevel extends AggregateRoot {
  constructor (
    readonly id: Id,
    readonly communityId: CommunityId,
    readonly userId: UserId,
    readonly currentExp: CurrentExp,
    readonly createdAt: CreatedAt
  ) {
    super()
  }

  static create (
    id: Id,
    communityId: CommunityId,
    userId: UserId,
    currentExp: CurrentExp
  ): UserLevel {
    const userLevel = new UserLevel(
      id,
      communityId,
      userId,
      currentExp,
      new CreatedAt(new Date())
    )

    userLevel.record(UserLevelCreatedDomainEvent.fromAggregate(userLevel))

    return userLevel
  }

  delete (): UserLevel {
    const userLevel = new UserLevel(
      this.id,
      this.communityId,
      this.userId,
      this.currentExp,
      this.createdAt
    )

    userLevel.record(UserLevelDeletedDomainEvent.fromAggregate(userLevel))

    return userLevel
  }
}
