import { Comment } from '@Course/Comment/domain/Comment'
import { Content } from '@Course/Comment/domain/ValueObjects/Content'
import { CreatedAt } from '@Course/Comment/domain/ValueObjects/CreatedAt'
import { Id } from '@Course/Comment/domain/ValueObjects/Id'
import { CourseId } from '@Course/Comment/domain/ValueObjects/CourseId'
import { UpdatedAt } from '@Course/Comment/domain/ValueObjects/UpdatedAt'
import { UserId } from '@Course/Comment/domain/ValueObjects/UserId'
import { Author } from '@Course/Comment/domain/ValueObjects/Author'
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
    courseId: {
      type: String,
      transformer: ValueObjectTransformer(CourseId)
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
      name: 'IDX_COMMENT_COURSE_ID',
      columns: ['courseId']
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
