import { NewUser } from '@Metrics/NewUser/domain/NewUser'
import { CommunityId } from '@Metrics/NewUser/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Metrics/NewUser/domain/ValueObjects/CreatedAt'
import { Id } from '@Metrics/NewUser/domain/ValueObjects/Id'
import { UserId } from '@Metrics/NewUser/domain/ValueObjects/UserId'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'

export const NewUserSchema = new EntitySchema<NewUser>({
  name: 'NewUser',
  target: NewUser,
  tableName: 'newuser',
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