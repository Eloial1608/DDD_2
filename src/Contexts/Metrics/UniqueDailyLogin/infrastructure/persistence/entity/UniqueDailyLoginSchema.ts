import { UniqueDailyLogin } from '@Metrics/UniqueDailyLogin/domain/UniqueDailyLogin'
import { CommunityId } from '@Metrics/UniqueDailyLogin/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Metrics/UniqueDailyLogin/domain/ValueObjects/CreatedAt'
import { Id } from '@Metrics/UniqueDailyLogin/domain/ValueObjects/Id'
import { UserId } from '@Metrics/UniqueDailyLogin/domain/ValueObjects/UserId'

import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'

export const UniqueDailyLoginSchema = new EntitySchema<UniqueDailyLogin>({
  name: 'UniqueDailyLogin',
  target: UniqueDailyLogin,
  tableName: 'uniquedailylogin',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    userId: {
      type: Boolean,
      transformer: ValueObjectTransformer(UserId)
    },
    communityId: {
      type: String,
      transformer: ValueObjectTransformer(CommunityId)
    },
    createdAt: {
      type: Date,
      transformer: ValueObjectTransformer(CreatedAt)
    }
}
})