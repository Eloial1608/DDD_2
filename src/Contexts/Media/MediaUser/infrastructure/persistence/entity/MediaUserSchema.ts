import { MediaUser } from '@Media/MediaUser/domain/MediaUser'
import { Id } from '@Media/MediaUser/domain/ValueObjects/Id'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { UserId } from '@Media/MediaUser/domain/ValueObjects/UserId'
import { CreatedAt } from '@Media/MediaUser/domain/ValueObjects/CreatedAt'
import { MediaId } from '@Media/MediaUser/domain/ValueObjects/MediaId'

export const MediaUserSchema = new EntitySchema<MediaUser>({
  name: 'MediaUser',
  target: MediaUser,
  tableName: 'media_user',
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
    mediaId: {
      type: String,
      transformer: ValueObjectTransformer(MediaId)
    },
    createdAt: {
      type: Date,
      createDate: true,
      transformer: ValueObjectTransformer(CreatedAt)
    }
  },
  indices: [
    {
      name: 'IDX_MEDIA_USER_USER_ID',
      columns: ['userId']
    },
    {
      name: 'IDX_MEDIA_USER_MEDIA_ID',
      columns: ['mediaId']
    }
  ]
})
