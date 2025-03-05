import { Content } from '@Media/Content/domain/Content'
import { CommunityId } from '@Media/Content/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Media/Content/domain/ValueObjects/CreatedAt'
import { Id } from '@Media/Content/domain/ValueObjects/Id'
import { MediaId } from '@Media/Content/domain/ValueObjects/MediaId'
import { Type } from '@Media/Content/domain/ValueObjects/Type'
import { UpdatedAt } from '@Media/Content/domain/ValueObjects/UpdatedAt'
import { Url } from '@Media/Content/domain/ValueObjects/Url'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'

export const ContentSchema = new EntitySchema<Content>({
  name: 'Content',
  target: Content,
  tableName: 'content',
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
    mediaId: {
      type: String,
      transformer: ValueObjectTransformer(MediaId)
    },
    type: {
      type: String,
      transformer: ValueObjectTransformer(Type)
    },
    url: {
      type: String,
      transformer: ValueObjectTransformer(Url)
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
      name: 'IDX_CONTENT_COMMUNITY_ID',
      columns: ['communityId']
    },
    {
      name: 'IDX_CONTENT_MEDIA_ID',
      columns: ['mediaId']
    }
  ]
})
