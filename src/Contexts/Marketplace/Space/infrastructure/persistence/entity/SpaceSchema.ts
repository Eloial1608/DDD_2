import { Space } from '@Marketplace/Space/domain/Space'
import { Id } from '@Marketplace/Space/domain/ValueObjects/Id'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { Accessibility } from '@Marketplace/Space/domain/ValueObjects/Accessibility'
import { Type } from '@Marketplace/Space/domain/ValueObjects/Type'
import { CommunityId } from '@Marketplace/Space/domain/ValueObjects/CommunityId'
import { Configuration } from '@Marketplace/Space/domain/ValueObjects/Configuration'

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
    configuration: {
      type: String,
      transformer: {
        from: (value: string): Configuration => new Configuration(JSON.parse(value)),
        to: (configuration: Configuration): string => JSON.stringify(configuration.configuration)
      }
    },
    accessibility: {
      type: String,
      transformer: ValueObjectTransformer(Accessibility)
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
