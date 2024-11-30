import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { CommunityId } from './ValueObjects/CommunityId'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { Email } from './ValueObjects/Email'
import { Id } from './ValueObjects/Id'
import { Method } from './ValueObjects/Method'
import { Secret } from './ValueObjects/Secret'
import { UserId } from './ValueObjects/UserId'

export class AuthUser extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly email: Email,
        readonly method: Method,
        readonly secret: Secret,
        readonly userId: UserId,
        readonly communityId: CommunityId,
        readonly createdAt: CreatedAt
  ) {
    super()
  }
}
