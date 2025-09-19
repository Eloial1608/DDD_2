import { EntitySchema } from 'typeorm'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { UserLevel } from '@Core/UserLevel/domain/UserLevel'
import { Id } from '@Core/UserLevel/domain/ValueObjects/Id'
import { CreatedAt } from '@Core/UserLevel/domain/ValueObjects/CreatedAt'
import { CommunityId } from '@Core/UserLevel/domain/ValueObjects/CommunityId'
import { CurrentExp } from '@Core/UserLevel/domain/ValueObjects/CurrentExp'
import { UserId } from '@Auth/AuthUser/domain/ValueObjects/UserId'

export const UserLevelSchema = new EntitySchema<UserLevel>({
  name: 'UserLevel',
  target: UserLevel,
  tableName: 'user_level',
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
    userId: {
      type: String,
      transformer: ValueObjectTransformer(UserId)
    },
    currentExp: {
      type: 'int',
      transformer: ValueObjectTransformer(CurrentExp)
    },
    createdAt: {
      type: Date,
      createDate: true,
      transformer: ValueObjectTransformer(CreatedAt)
    }
  }
})
