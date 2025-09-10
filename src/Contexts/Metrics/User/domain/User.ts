import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { CommunityId } from './ValueObjects/CommunityId'
import { MainId } from './ValueObjects/MainId'
import { Name } from './ValueObjects/Name'
import { IsAdmin } from './ValueObjects/IsAdmin'
import { IsOwner } from './ValueObjects/IsOwner'
import { Username } from './ValueObjects/Username'
import { UserCreatedDomainEvent } from './Events/UserCreatedDomainEvent'
import { UserUpdatedDomainEvent } from './Events/UserUpdatedDomainEvent'
import { UserIsAdminUpdatedDomainEvent } from './Events/UserIsAdminUpdatedDomainEvent'

export class User extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly mainId: MainId,
        readonly communityId: CommunityId,
        readonly name: Name,
        readonly username: Username,
        readonly isAdmin: IsAdmin,
        readonly isOwner: IsOwner) {
    super()
  }

  static create (
    id: Id,
    mainId: MainId,
    communityId: CommunityId,
    name: Name,
    username: Username,
    isAdmin: IsAdmin,
    isOwner: IsOwner
  ): User {
    const user = new User(
      id,
      mainId,
      communityId,
      name,
      username,
      isAdmin,
      isOwner
    )
    user.record(UserCreatedDomainEvent.fromAggregate(user))
    return user
  }

  update (
    name: Name,
    username: Username
  ): User {
    const user = new User(
      this.id,
      this.mainId,
      this.communityId,
      name,
      username,
      this.isAdmin,
      this.isOwner
    )

    user.record(UserUpdatedDomainEvent.fromAggregate(user))

    return user
  }

  updateIsAdmin (
    isAdmin: IsAdmin
  ): User {
    const user = new User(
      this.id,
      this.mainId,
      this.communityId,
      this.name,
      this.username,
      isAdmin,
      this.isOwner
    )

    user.record(UserIsAdminUpdatedDomainEvent.fromAggregate(user))

    return user
  }
}
