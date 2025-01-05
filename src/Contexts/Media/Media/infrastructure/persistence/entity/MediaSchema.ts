import { Media } from '@Media/Media/domain/Media'
import { Id } from '@Media/Media/domain/ValueObjects/Id'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { CommunityId } from '@Media/Media/domain/ValueObjects/CommunityId'
import { UserId } from '@Media/Media/domain/ValueObjects/UserId'
import { Title } from '@Media/Media/domain/ValueObjects/Title'
import { BannerUrl } from '@Media/Media/domain/ValueObjects/BannerUrl'
import { IsPaid } from '@Media/Media/domain/ValueObjects/IsPaid'
import { TotalLikes } from '@Media/Media/domain/ValueObjects/TotalLikes'
import { TotalComments } from '@Media/Media/domain/ValueObjects/TotalComments'
import { CreatedAt } from '@Media/Media/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Media/Media/domain/ValueObjects/UpdatedAt'
import { DeletedAt } from '@Media/Media/domain/ValueObjects/DeletedAt'
import { Price, PriceCurrency, PriceValue } from '@Media/Media/domain/ValueObjects/Price'
import { Author } from '@Media/Media/domain/ValueObjects/Author'
import { SpaceId } from '@Media/Media/domain/ValueObjects/SpaceId'
import { ContentIds } from '@Media/Media/domain/ValueObjects/ContentIds'

const MediaPriceSchema = new EntitySchema<Price>({
  name: 'mediaPrice',
  target: Price,
  columns: {
    value: {
      type: 'int',
      nullable: true,
      transformer: ValueObjectTransformer(PriceValue)
    },
    currency: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(PriceCurrency)
    }
  }
})

const MediaAuthorSchema = new EntitySchema<Author>({
  name: 'mediaAuthor',
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

export const Mediachema = new EntitySchema<Media>({
  name: 'Media',
  target: Media,
  tableName: 'media',
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
    userId: {
      type: String,
      transformer: ValueObjectTransformer(UserId)
    },
    spaceId: {
      type: String,
      transformer: ValueObjectTransformer(SpaceId)
    },
    title: {
      type: String,
      transformer: ValueObjectTransformer(Title)
    },
    contentIds: {
      type: 'simple-array',
      transformer: ValueObjectTransformer(ContentIds)
    },
    bannerUrl: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(BannerUrl)
    },
    isPaid: {
      type: Boolean,
      transformer: ValueObjectTransformer(IsPaid)
    },
    totalLikes: {
      type: Number,
      transformer: ValueObjectTransformer(TotalLikes)
    },
    totalComments: {
      type: Number,
      transformer: ValueObjectTransformer(TotalComments)
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
    },
    deletedAt: {
      type: Date,
      deleteDate: true,
      transformer: ValueObjectTransformer(DeletedAt)
    }
  },
  indices: [
    {
      name: 'IDX_MEDIA_COMMUNITY_ID',
      columns: ['communityId']
    },
    {
      name: 'IDX_MEDIA_USER_ID',
      columns: ['userId']
    },
    {
      name: 'IDX_MEDIA_SPACE_ID',
      columns: ['spaceId']
    }
  ],
  embeddeds: {
    price: {
      schema: MediaPriceSchema,
      prefix: 'price'
    },
    author: {
      schema: MediaAuthorSchema,
      prefix: 'author'
    }
  }
})
