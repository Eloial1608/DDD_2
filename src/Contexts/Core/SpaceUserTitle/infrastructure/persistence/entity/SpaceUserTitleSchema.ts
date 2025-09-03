import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { SpaceUserTitle } from '@Core/SpaceUserTitle/domain/SpaceUserTitle'
import { Id } from '@Core/SpaceUserTitle/domain/ValueObjects/Id'
import { CreatedAt } from '@Core/SpaceUserTitle/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Core/SpaceUserTitle/domain/ValueObjects/UpdatedAt'
import { CommunityId } from '@Core/SpaceUserTitle/domain/ValueObjects/CommunityId'
import { UserId } from '@Core/SpaceUserTitle/domain/ValueObjects/UserId'
import { SpaceId } from '@Core/SpaceUserTitle/domain/ValueObjects/SpaceId'
import { TitleId } from '@Core/SpaceUserTitle/domain/ValueObjects/TitleId'


export const SpaceUserTitleSchema = new EntitySchema<SpaceUserTitle>({
  name: 'SpaceUserTitle',
  target: SpaceUserTitle,
  tableName: 'space_user_title',
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
    titleId: {
      type: String,
      transformer: ValueObjectTransformer(TitleId)
    },
    userId: {
      type: String,
      transformer: ValueObjectTransformer(UserId)
    },
    spaceId: {
      type: String,
      transformer: ValueObjectTransformer(SpaceId)
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
    }
  },
  indices: [
    {
      name: 'IDX_SPACE_USER_TITLE_COMMUNITY_ID',
      columns: ['communityId']
    },
    {
      name: 'IDX_SPACE_USER_TITLE_USER_ID',
      columns: ['userId']
    },
    {
      name: 'IDX_SPACE_USER_TITLE_TITLE_ID',
      columns: ['titleId']
    }
  ]
})
