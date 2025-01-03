import { PostUser } from '@Posts/PostUser/domain/PostUser'
import { Id } from '@Posts/PostUser/domain/ValueObjects/Id'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { UserId } from '@Posts/PostUser/domain/ValueObjects/UserId'
import { CreatedAt } from '@Posts/PostUser/domain/ValueObjects/CreatedAt'
import { PostId } from '@Posts/PostUser/domain/ValueObjects/PostId'

export const PostUserSchema = new EntitySchema<PostUser>({
  name: 'PostUser',
  target: PostUser,
  tableName: 'post_user',
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
    postId: {
      type: String,
      transformer: ValueObjectTransformer(PostId)
    },
    createdAt: {
      type: Date,
      createDate: true,
      transformer: ValueObjectTransformer(CreatedAt)
    }
  },
  indices: [
    {
      name: 'IDX_POST_USER_USER_ID',
      columns: ['userId']
    },
    {
      name: 'IDX_POST_USER_POST_ID',
      columns: ['postId']
    }
  ]
})
