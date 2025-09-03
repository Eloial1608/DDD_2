import { UserRetention } from '@Metrics/UserRetention/domain/UserRetention'
import { CommunityId } from '@Metrics/UserRetention/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Metrics/UserRetention/domain/ValueObjects/CreatedAt'
import { EndDate } from '@Metrics/UserRetention/domain/ValueObjects/EndDate'
import { Id } from '@Metrics/UserRetention/domain/ValueObjects/Id'
import { StartDate } from '@Metrics/UserRetention/domain/ValueObjects/StartDate'
import { UserId } from '@Metrics/UserRetention/domain/ValueObjects/UserId'

import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'

export const UserRetentionSchema = new EntitySchema<UserRetention>({
  name: 'UserRetention',
  target: UserRetention,
  tableName: 'userretention',
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
    startDate: {
      type: Date,
      transformer: ValueObjectTransformer(StartDate)
    },
    endDate: {
      type: Date,
      nullable: true,
      transformer: ValueObjectTransformer(EndDate)
    },
    createdAt: {
      type: Date,
      transformer: ValueObjectTransformer(CreatedAt)
    }
}
})