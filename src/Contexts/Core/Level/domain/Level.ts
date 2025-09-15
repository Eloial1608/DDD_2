import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Id } from '@Core/Level/domain/ValueObjects/Id'
import { LevelNumber } from '@Core/Level/domain/ValueObjects/LevelNumber'
import { CreatedAt } from '@Core/Level/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Core/Level/domain/ValueObjects/UpdatedAt'
import { LevelCreatedDomainEvent } from './Events/LevelCreatedDomainEvent'
import { CommunityId } from'@Core/Level/domain/ValueObjects/CommunityId'
import { MinimumExp } from './ValueObjects/MinimumExp'

export class Level extends AggregateRoot {
  constructor (
        readonly id: Id,
        readonly communityId: CommunityId,
        readonly levelNumber: LevelNumber,
        readonly minimumExp: MinimumExp,
        readonly createdAt: CreatedAt,
        readonly updatedAt: UpdatedAt

  ) {
    super()
  }

  static create (
    id: Id,
    communityId: CommunityId,
    levelNumber: LevelNumber,
    minimumExp: MinimumExp,
  ): Level {
    const level = new Level(
      id,
      communityId,
      levelNumber,
      minimumExp,
      new CreatedAt(new Date()),
      new UpdatedAt(new Date())
    )

    level.record(LevelCreatedDomainEvent.fromAggregate(level))

    return level
  }
}
