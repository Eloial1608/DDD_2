import { Comment } from '@Posts/Comment/domain/Comment'
import { Content } from '@Posts/Comment/domain/ValueObjects/Content'
import { CreatedAt } from '@Posts/Comment/domain/ValueObjects/CreatedAt'
import { Id } from '@Posts/Comment/domain/ValueObjects/Id'
import { PostId } from '@Posts/Comment/domain/ValueObjects/PostId'
import { UpdatedAt } from '@Posts/Comment/domain/ValueObjects/UpdatedAt'
import { UserId } from '@Posts/Comment/domain/ValueObjects/UserId'
import { UserMetadata } from '@Posts/Comment/domain/ValueObjects/UserMetadata'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'

export const CommunitySchema = new EntitySchema<Comment>({
  name: 'Comment',
  target: Comment,
  tableName: 'comment',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    postId: {
      type: String,
      transformer: ValueObjectTransformer(PostId)
    },
    userId: {
      type: String,
      transformer: ValueObjectTransformer(UserId)
    },
    userMetadata: {
      type: String,
      transformer: ValueObjectTransformer(UserMetadata)
    },
    content: {
      type: String,
      transformer: ValueObjectTransformer(Content)
    },
    createdAt: {
      type: Date,
      transformer: ValueObjectTransformer(CreatedAt)
    },
    updatedAt: {
      type: Date,
      transformer: ValueObjectTransformer(UpdatedAt)
    }
  }
})
