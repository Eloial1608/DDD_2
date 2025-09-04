import { Space } from '@Metrics/Space/domain/Space'
import { Id } from '@Metrics/Space/domain/ValueObjects/Id'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { Type } from '@Metrics/Space/domain/ValueObjects/Type'
import { CommunityId } from '@Metrics/Space/domain/ValueObjects/CommunityId'

export const SpaceSchema = new EntitySchema<Space>({
  name: 'Space',
  target: Space,
  tableName: 'space',
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
    type: {
      type: String,
      transformer: ValueObjectTransformer(Type)
    }
  },
  indices: [
    {
      name: 'IDX_SPACE_COMMUNITY_ID',
      columns: ['communityId']
    }
  ]
})
