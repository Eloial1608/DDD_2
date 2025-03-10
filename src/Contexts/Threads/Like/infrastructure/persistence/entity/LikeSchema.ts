import { Like } from '@Threads/Like/domain/Like'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { Id } from '@Threads/Like/domain/ValueObjects/Id'
import { ThreadId } from '@Threads/Like/domain/ValueObjects/ThreadId'
import { UserId } from '@Threads/Like/domain/ValueObjects/UserId'
import { CreatedAt } from '@Threads/Like/domain/ValueObjects/CreatedAt'
import { EntitySchema } from 'typeorm'

export const LikeSchema = new EntitySchema<Like>({
  name: 'Like',
  target: Like,
  tableName: 'like',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    threadId: {
      type: String,
      transformer: ValueObjectTransformer(ThreadId)
    },
    userId: {
      type: String,
      transformer: ValueObjectTransformer(UserId)
    },
    createdAt: {
      type: Date,
      transformer: ValueObjectTransformer(CreatedAt)
    }
  },
  indices: [
    {
      name: 'IDX_LIKE_USER_ID',
      columns: ['userId']
    },
    {
      name: 'IDX_LIKE_THREAD_ID',
      columns: ['threadId']
    }
  ]
})
