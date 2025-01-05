import { SpaceMember } from '@Media/SpaceMember/domain/SpaceMember'
import { Id } from '@Media/SpaceMember/domain/ValueObjects/Id'
import { IsModerator } from '@Media/SpaceMember/domain/ValueObjects/IsModerator'
import { SpaceId } from '@Media/SpaceMember/domain/ValueObjects/SpaceId'
import { UserId } from '@Media/SpaceMember/domain/ValueObjects/UserId'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'

export const SpaceMemberSchema = new EntitySchema<SpaceMember>({
  name: 'SpaceMember',
  target: SpaceMember,
  tableName: 'space_member',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    spaceId: {
      type: String,
      transformer: ValueObjectTransformer(SpaceId)
    },
    userId: {
      type: String,
      transformer: ValueObjectTransformer(UserId)
    },
    isModerator: {
      type: Boolean,
      transformer: ValueObjectTransformer(IsModerator)
    }
  },
  indices: [
    {
      name: 'IDX_SPACE_MEMBER_SPACE_ID',
      columns: ['spaceId']
    },
    {
      name: 'IDX_SPACE_MEMBER_USER_ID',
      columns: ['userId']
    }
  ]
})
