import { Review } from '@Marketplace/Review/domain/Review'
import { Author } from '@Marketplace/Review/domain/ValueObjects/Author'
import { Content } from '@Marketplace/Review/domain/ValueObjects/Content'
import { CreatedAt } from '@Marketplace/Review/domain/ValueObjects/CreatedAt'
import { Id } from '@Marketplace/Review/domain/ValueObjects/Id'
import { ProductId } from '@Marketplace/Review/domain/ValueObjects/ProductId'
import { Rating } from '@Marketplace/Review/domain/ValueObjects/Rating'
import { UserId } from '@Marketplace/Review/domain/ValueObjects/UserId'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'

const RatingAuthorSchema = new EntitySchema<Author>({
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

export const Reviewchema = new EntitySchema<Review>({
  name: 'Review',
  target: Review,
  tableName: 'review',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    productId: {
      type: String,
      transformer: ValueObjectTransformer(ProductId)
    },
    content: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(Content)
    },
    rating: {
      type: Number,
      transformer: ValueObjectTransformer(Rating)
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
      name: 'IDX_MARKETPLACE_USER_ID',
      columns: ['userId']
    },
    {
      name: 'IDX_MARKETPLACE_PRODUCT_ID',
      columns: ['productId']
    }
  ],
  embeddeds: {
    author: {
      schema: RatingAuthorSchema,
      prefix: 'author'
    }
  }

})
