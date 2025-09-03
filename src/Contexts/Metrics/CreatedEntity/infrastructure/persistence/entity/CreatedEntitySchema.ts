import { TotalMedia } from '@Core/User/domain/ValueObjects/TotalMedia'
import { CreatedEntity } from '@Metrics/CreatedEntity/domain/CreatedEntity'
import { CommunityId } from '@Metrics/CreatedEntity/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Metrics/CreatedEntity/domain/ValueObjects/CreatedAt'
import { Id } from '@Metrics/CreatedEntity/domain/ValueObjects/Id'
import { TotalPost } from '@Metrics/CreatedEntity/domain/ValueObjects/TotalPost'
import { TotalThread } from '@Metrics/CreatedEntity/domain/ValueObjects/TotalThread'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'

export const CreatedEntitySchema = new EntitySchema<CreatedEntity>({
  name: 'CreatedEntity',
  target: CreatedEntity,
  tableName: 'createdentity',
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
    totalPost: {
      type: Number,
      transformer: ValueObjectTransformer(TotalPost)
    },
    totalMedia: {
      type: Number,
      transformer: ValueObjectTransformer(TotalMedia)
    },
    totalThread: {
      type: Number,
      transformer: ValueObjectTransformer(TotalThread)
    },
    createdAt: {
      type: Date,
      transformer: ValueObjectTransformer(CreatedAt)
    }
  }
})
