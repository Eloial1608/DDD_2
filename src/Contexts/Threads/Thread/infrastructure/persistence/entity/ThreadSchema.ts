import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { Thread } from '@Threads/Thread/domain/Thread'
import { Author } from '@Threads/Thread/domain/ValueObjects/Author'
import { BannerUrl } from '@Threads/Thread/domain/ValueObjects/BannerUrl'
import { CommunityId } from '@Threads/Thread/domain/ValueObjects/CommunityId'
import { Content } from '@Threads/Thread/domain/ValueObjects/Content'
import { CreatedAt } from '@Threads/Thread/domain/ValueObjects/CreatedAt'
import { DeletedAt } from '@Threads/Thread/domain/ValueObjects/DeletedAt'
import { Id } from '@Threads/Thread/domain/ValueObjects/Id'
import { IsPaid } from '@Threads/Thread/domain/ValueObjects/IsPaid'
import { MainThreadId } from '@Threads/Thread/domain/ValueObjects/MainId'
import { ParentThreadId } from '@Threads/Thread/domain/ValueObjects/ParentThreadId'
import { Price, PriceCurrency, PriceValue } from '@Threads/Thread/domain/ValueObjects/Price'
import { SpaceId } from '@Threads/Thread/domain/ValueObjects/SpaceId'
import { Title } from '@Threads/Thread/domain/ValueObjects/Title'
import { TotalLikes } from '@Threads/Thread/domain/ValueObjects/TotalLikes'
import { TotalThreads } from '@Threads/Thread/domain/ValueObjects/TotalThreads'
import { UpdatedAt } from '@Threads/Thread/domain/ValueObjects/UpdatedAt'
import { UserId } from '@Threads/Thread/domain/ValueObjects/UserId'
import { EntitySchema } from 'typeorm'

const ThreadPriceSchema = new EntitySchema<Price>({
  name: 'threadPrice',
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

const ThreadAuthorSchema = new EntitySchema<Author>({
  name: 'threadAuthor',
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

export const ThreadSchema = new EntitySchema<Thread>({
  name: 'Thread',
  target: Thread,
  tableName: 'thread',
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
    parentThreadId: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(ParentThreadId)
    },
    mainThreadId:{
      type:String,
      nullable: true,
      transformer: ValueObjectTransformer(MainThreadId)
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
    totalThreads: {
      type: Number,
      transformer: ValueObjectTransformer(TotalThreads)
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
      name: 'IDX_THREAD_COMMUNITY_ID',
      columns: ['communityId']
    },
    {
      name: 'IDX_THREAD_USER_ID',
      columns: ['userId']
    },
    {
      name: 'IDX_THREAD_SPACE_ID',
      columns: ['spaceId']
    }
  ],
  embeddeds: {
    price: {
      schema: ThreadPriceSchema,
      prefix: 'price'
    },
    author: {
      schema: ThreadAuthorSchema,
      prefix: 'author'
    }
  }
})
