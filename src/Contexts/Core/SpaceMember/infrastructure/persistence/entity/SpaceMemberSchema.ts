import { SpaceMember } from '@Core/SpaceMember/domain/SpaceMember'
import { Id } from '@Core/SpaceMember/domain/ValueObjects/Id'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { CreatedAt } from '@Core/SpaceMember/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Core/SpaceMember/domain/ValueObjects/UpdatedAt'
import { DeletedAt } from '@Core/SpaceMember/domain/ValueObjects/DeletedAt'
import { CommunityId } from '@Core/SpaceMember/domain/ValueObjects/CommunityId'
import { UserId } from '@Core/SpaceMember/domain/ValueObjects/UserId'
import { SpaceId } from '@Core/SpaceMember/domain/ValueObjects/SpaceId'
import { IsModerator } from '@Core/SpaceMember/domain/ValueObjects/IsModerator'
import { IsBanned } from '@Core/SpaceMember/domain/ValueObjects/IsBanned'
import { InvitedBy } from '@Core/SpaceMember/domain/ValueObjects/InvitedBy'
import { InvitedAt } from '@Core/SpaceMember/domain/ValueObjects/InvitedAt'

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
    userId: {
      type: String,
      transformer: ValueObjectTransformer(UserId)
    },
    spaceId: {
      type: String,
      transformer: ValueObjectTransformer(SpaceId)
    },
    communityId: {
      type: String,
      transformer: ValueObjectTransformer(CommunityId)
    },
    isModerator: {
      type: Boolean,
      transformer: ValueObjectTransformer(IsModerator)
    },
    isBanned: {
      type: Boolean,
      transformer: ValueObjectTransformer(IsBanned)
    },
    invitedBy: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(InvitedBy)
    },
    invitedAt: {
      type: Date,
      nullable: true,
      transformer: ValueObjectTransformer(InvitedAt)
    },
    createdAt: {
      type: Date,
      createDate: true,
      transformer: ValueObjectTransformer(CreatedAt)
    },
    updatedAt: {
      type: Date,
      updateDate: true,
      transformer: ValueObjectTransformer(UpdatedAt)
    },
    deletedAt: {
      type: Date,
      nullable: true,
      deleteDate: true,
      transformer: ValueObjectTransformer(DeletedAt)
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
    },
    {
      name: 'IDX_SPACE_MEMBER_COMMUNITY_ID',
      columns: ['communityId']
    }
  ]
})
