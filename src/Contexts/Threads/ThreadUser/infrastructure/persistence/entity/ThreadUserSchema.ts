import { ThreadUser } from '@Threads/ThreadUser/domain/ThreadUser'
import { Id } from '@Threads/ThreadUser/domain/ValueObjects/Id'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { UserId } from '@Threads/ThreadUser/domain/ValueObjects/UserId'
import { CreatedAt } from '@Threads/ThreadUser/domain/ValueObjects/CreatedAt'
import { ThreadId } from '@Threads/ThreadUser/domain/ValueObjects/ThreadId'

export const ThreadUserSchema = new EntitySchema<ThreadUser>({
  name: 'ThreadUser',
  target: ThreadUser,
  tableName: 'thread_user',
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
    threadId: {
      type: String,
      transformer: ValueObjectTransformer(ThreadId)
    },
    createdAt: {
      type: Date,
      createDate: true,
      transformer: ValueObjectTransformer(CreatedAt)
    }
  },
  indices: [
    {
      name: 'IDX_THREAD_USER_USER_ID',
      columns: ['userId']
    },
    {
      name: 'IDX_THREAD_USER_THREAD_ID',
      columns: ['threadId']
    }
  ]
})
