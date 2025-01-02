import { Post } from '@Posts/Post/domain/Post'
import { Id } from '@Posts/Post/domain/ValueObjects/Id'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { CommunityId } from '@Posts/Post/domain/ValueObjects/CommunityId'
import { UserId } from '@Posts/Post/domain/ValueObjects/UserId'
import { Title } from '@Posts/Post/domain/ValueObjects/Title'
import { Content } from '@Posts/Post/domain/ValueObjects/Content'
import { BannerUrl } from '@Posts/Post/domain/ValueObjects/BannerUrl'
import { IsPaid } from '@Posts/Post/domain/ValueObjects/IsPaid'
import { TotalLikes } from '@Posts/Post/domain/ValueObjects/TotalLikes'
import { TotalComments } from '@Posts/Post/domain/ValueObjects/TotalComments'
import { CreatedAt } from '@Posts/Post/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Posts/Post/domain/ValueObjects/UpdatedAt'
import { DeletedAt } from '@Posts/Post/domain/ValueObjects/DeletedAt'
import { Price, PriceCurrency, PriceValue } from '@Posts/Post/domain/ValueObjects/Price'
import { Author } from '@Posts/Post/domain/ValueObjects/Author'

const PostPriceSchema = new EntitySchema<Price>({
  name: 'postPrice',
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

const PostAuthorSchema = new EntitySchema<Author>({
  name: 'postAuthor',
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

export const PostSchema = new EntitySchema<Post>({
  name: 'Post',
  target: Post,
  tableName: 'post',
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
    title: {
      type: String,
      transformer: ValueObjectTransformer(Title)
    },
    content: {
      type: String,
      transformer: ValueObjectTransformer(Content)
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
      name: 'IDX_POST_COMMUNITY_ID',
      columns: ['communityId']
    },
    {
      name: 'IDX_POST_USER_ID',
      columns: ['userId']
    }
  ],
  embeddeds: {
    price: {
      schema: PostPriceSchema,
      prefix: 'price'
    },
    author: {
      schema: PostAuthorSchema,
      prefix: 'author'
    }
  }
})
