import { Community } from '@Chat/Community/domain/Community'
import { Id } from '@Chat/Community/domain/ValueObjects/Id'
import { IsPrivate } from '@Chat/Community/domain/ValueObjects/IsPrivate'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'

export const CommunitySchema = new EntitySchema<Community>({
  name: 'Community',
  target: Community,
  tableName: 'community',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    isPrivate: {
      type: Boolean,
      transformer: ValueObjectTransformer(IsPrivate)
    }
  }
})
