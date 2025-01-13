import { Community } from '@Posts/Community/domain/Community'
import { Id } from '@Posts/Community/domain/ValueObjects/Id'
import { IsPrivate } from '@Posts/Community/domain/ValueObjects/IsPrivate'
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
