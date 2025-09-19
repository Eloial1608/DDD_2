import { Level } from '@Core/Level/domain/Level'
import { CommunityId } from '@Core/Level/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Core/Level/domain/ValueObjects/CreatedAt'
import { Id } from '@Core/Level/domain/ValueObjects/Id'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { UpdatedAt } from '@Threads/Thread/domain/ValueObjects/UpdatedAt'
import { LevelNumber } from '@Core/Level/domain/ValueObjects/LevelNumber'
import { IntegerMother } from '@Tests/Contexts/Shared/domain/IntegerMother'
import { MinimumExp } from '@Core/Level/domain/ValueObjects/MinimumExp'

export class LevelMother {
  static create (params: Partial<Level>): Level {
    const levelNumber = params.levelNumber ?? new LevelNumber(IntegerMother.positive())
    const minimumExp = params.minimumExp ?? new MinimumExp(IntegerMother.positive())
    const id = params.id ?? new Id(UuidMother.random())
    return new Level(
      id,
      params.communityId ?? new CommunityId(UuidMother.random()),
      levelNumber,
      minimumExp,
      params.createdAt ?? new CreatedAt(new Date()),
      params.updatedAt ?? new UpdatedAt(new Date())
    )
  }

  static random (): Level {
    return this.create({})
  }
}
