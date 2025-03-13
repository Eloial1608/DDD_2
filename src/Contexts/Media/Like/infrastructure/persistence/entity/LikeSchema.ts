import { Like } from '@Media/Like/domain/Like'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { Id } from '@Media/Like/domain/ValueObjects/Id'
import { MediaId } from '@Media/Like/domain/ValueObjects/MediaId'
import { UserId } from '@Media/Like/domain/ValueObjects/UserId'
import { CreatedAt } from '@Media/Like/domain/ValueObjects/CreatedAt'
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
    mediaId: {
      type: String,
      transformer: ValueObjectTransformer(MediaId)
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
      name: 'IDX_LIKE_MEDIA_ID',
      columns: ['mediaId']
    }
  ]
})
