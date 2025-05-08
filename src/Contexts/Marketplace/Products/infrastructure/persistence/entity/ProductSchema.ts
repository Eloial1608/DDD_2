import { Product } from '@Marketplace/Products/domain/Product'
import { Author } from '@Marketplace/Products/domain/ValueObjects/Author'
import { BannerUrl } from '@Marketplace/Products/domain/ValueObjects/BannerUrl'
import { CommunityId } from '@Marketplace/Products/domain/ValueObjects/CommunityId'
import { Content } from '@Marketplace/Products/domain/ValueObjects/Content'
import { CreatedAt } from '@Marketplace/Products/domain/ValueObjects/CreatedAt'
import { DeletedAt } from '@Marketplace/Products/domain/ValueObjects/DeletedAt'
import { Id } from '@Marketplace/Products/domain/ValueObjects/Id'
import { Price, PriceCurrency, PriceValue } from '@Marketplace/Products/domain/ValueObjects/Price'
import { SpaceId } from '@Marketplace/Products/domain/ValueObjects/SpaceId'
import { Title } from '@Marketplace/Products/domain/ValueObjects/Title'
import { UpdatedAt } from '@Marketplace/Products/domain/ValueObjects/UpdatedAt'
import { UserId } from '@Marketplace/Products/domain/ValueObjects/UserId'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'

const ProductPriceSchema = new EntitySchema<Price>({
  name: 'productPrice',
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

const ProductAuthorSchema = new EntitySchema<Author>({
  name: 'productAuthor',
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

export const ProductSchema = new EntitySchema<Product>({
  name: 'Product',
  target: Product,
  tableName: 'product',
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
    content: {
      type: String,
      transformer: ValueObjectTransformer(Content)
    },
    bannerUrl: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(BannerUrl)
    },
    type: {
      type: String,
      transformer: ValueObjectTransformer(BannerUrl)
    },
    stock: {
      type: Number,
      nullable: true,
      transformer: ValueObjectTransformer(BannerUrl)
    },
    totalRatings: {
      type: Number,
      transformer: ValueObjectTransformer(BannerUrl)
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
      name: 'IDX_PRODUCT_COMMUNITY_ID',
      columns: ['communityId']
    },
    {
      name: 'IDX_PRODUCT_USER_ID',
      columns: ['userId']
    },
    {
      name: 'IDX_PRODUCT_SPACE_ID',
      columns: ['spaceId']
    }
  ],
  embeddeds: {
    price: {
      schema: ProductPriceSchema,
      prefix: 'price'
    },
    author: {
      schema: ProductAuthorSchema,
      prefix: 'author'
    }
  }
})
