import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { UserTitle } from '@Core/UserTitle/domain/UserTitle'
import { Id } from '@Core/UserTitle/domain/ValueObjects/Id'
import { CreatedAt } from '@Core/UserTitle/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Core/UserTitle/domain/ValueObjects/UpdatedAt'
import { CommunityId } from '@Core/UserTitle/domain/ValueObjects/CommunityId'
import { UserId } from '@Core/UserTitle/domain/ValueObjects/UserId'
import { TitleId } from '@Core/UserTitle/domain/ValueObjects/TitleId'

export const UserTitleSchema = new EntitySchema<UserTitle>({
  name: 'UserTitle',
  target: UserTitle,
  tableName: '_user_title',
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
      name: 'IDX__USER_TITLE_COMMUNITY_ID',
      columns: ['communityId']
    },
    {
      name: 'IDX__USER_TITLE_USER_ID',
      columns: ['userId']
    },
    {
      name: 'IDX__USER_TITLE_TITLE_ID',
      columns: ['titleId']
    }
  ]
})
