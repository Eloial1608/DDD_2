import { EntitySchema } from 'typeorm'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { Level } from '@Core/Level/domain/Level'
import { Id } from '@Core/Level/domain/ValueObjects/Id'
import { CreatedAt } from '@Core/Level/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Core/Level/domain/ValueObjects/UpdatedAt'
import { LevelNumber } from '@Core/Level/domain/ValueObjects/LevelNumber'
import { CommunityId } from'@Core/Level/domain/ValueObjects/CommunityId'
import { MinimumExp } from '@Core/Level/domain/ValueObjects/MinimumExp'

export const LevelSchema = new EntitySchema<Level>({
  name: 'Level',
  target: Level,
  tableName: 'user_plan',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    communityId: {
      type: String,
      transformer: ValueObjectTransformer(CommunityId)
    },
    levelNumber: {
      type: 'int',
      transformer: ValueObjectTransformer(LevelNumber)
    },
    minimumExp: {
      type: 'int',
      transformer: ValueObjectTransformer(MinimumExp)
    },
    createdAt: {
      type: Date,
      createDate: true,
      transformer: ValueObjectTransformer(CreatedAt)
    },
    updatedAt: {
      type: Date,
      updateDate: true,
      transformer: ValueObjectTransformer(UpdatedAt)
    }
  }
})
