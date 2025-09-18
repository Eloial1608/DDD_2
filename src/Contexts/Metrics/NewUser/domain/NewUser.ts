import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { UserId } from './ValueObjects/UserId'
import { CommunityId } from './ValueObjects/CommunityId'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { NewUserCreatedDomainEvent } from './Events/NewUserCreatedDomainEvent'

export class NewUser extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly userId: UserId,
        readonly communityId: CommunityId,
        readonly createdAt: CreatedAt) {
    super()
  }

  static create (id: Id, userId: UserId, communityId: CommunityId): NewUser {
    const newUser = new NewUser(
      id,
      userId,
      communityId,
      new CreatedAt(new Date())
    )
    newUser.record(NewUserCreatedDomainEvent.fromAggregate(newUser))
    return newUser
  }
}
