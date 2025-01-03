import { Comment } from '@Posts/Comment/domain/Comment'
import { Content } from '@Posts/Comment/domain/ValueObjects/Content'
import { CreatedAt } from '@Posts/Comment/domain/ValueObjects/CreatedAt'
import { Id } from '@Posts/Comment/domain/ValueObjects/Id'
import { PostId } from '@Posts/Comment/domain/ValueObjects/PostId'
import { UpdatedAt } from '@Posts/Comment/domain/ValueObjects/UpdatedAt'
import { UserId } from '@Posts/Comment/domain/ValueObjects/UserId'
import { Author } from '@Posts/Comment/domain/ValueObjects/Author'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'

const CommentAuthorSchema = new EntitySchema<Author>({
  name: 'CommentAuthor',
  target: Author,
  columns: {
    id: {
      type: String
    },
    mainId: {
      type: String
    },
    name: {
      type: String
    },
    username: {
      type: String
    },
    pictureUrl: {
      type: String,
      nullable: true
    },
    bannerUrl: {
      type: String,
      nullable: true
    }
  }
})

export const CommentSchema = new EntitySchema<Comment>({
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
  },
  indices: [
    {
      name: 'IDX_COMMENT_POST_ID',
      columns: ['postId']
    },
    {
      name: 'IDX_COMMENT_USER_ID',
      columns: ['userId']
    }
  ],
  embeddeds: {
    author: {
      schema: CommentAuthorSchema,
      prefix: 'author'
    }
  }
})
