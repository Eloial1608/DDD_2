import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from './ValueObjects/Id'
import { SpaceId } from './ValueObjects/SpaceId'
import { UserId } from './ValueObjects/UserId'
import { IsModerator } from './ValueObjects/IsModerator'

export class SpaceMember extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly spaceId: SpaceId,
        readonly userId: UserId,
        readonly isModerator: IsModerator
  ) {
    super()
  }
}
