import { Course } from '@Course/Course/domain/Course'
import { Author } from '@Course/Course/domain/ValueObjects/Author'
import { BannerUrl } from '@Course/Course/domain/ValueObjects/BannerUrl'
import { CommunityId } from '@Course/Course/domain/ValueObjects/CommunityId'
import { CreatedAt } from '@Course/Course/domain/ValueObjects/CreatedAt'
import { DeletedAt } from '@Course/Course/domain/ValueObjects/DeletedAt'
import { EndDate } from '@Course/Course/domain/ValueObjects/EndDate'
import { Id } from '@Course/Course/domain/ValueObjects/Id'
import { IsPaid } from '@Course/Course/domain/ValueObjects/IsPaid'
import { MaxStudents } from '@Course/Course/domain/ValueObjects/MaxStudents'
import { Price, PriceCurrency, PriceValue } from '@Course/Course/domain/ValueObjects/Price'
import { SpaceId } from '@Course/Course/domain/ValueObjects/SpaceId'
import { StartDate } from '@Course/Course/domain/ValueObjects/StartDate'
import { Title } from '@Course/Course/domain/ValueObjects/Title'
import { TotalComments } from '@Course/Course/domain/ValueObjects/TotalComments'
import { TotalStudents } from '@Course/Course/domain/ValueObjects/TotalStudents'
import { UpdatedAt } from '@Course/Course/domain/ValueObjects/UpdatedAt'
import { UserId } from '@Course/Course/domain/ValueObjects/UserId'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'

const CourseAuthorSchema = new EntitySchema<Author>({
  name: 'CourseAuthor',
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

const CoursePriceSchema = new EntitySchema<Price>({
  name: 'CoursePrice',
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

export const CourseSchema = new EntitySchema<Course>({
  name: 'Course',
  target: Course,
  tableName: 'course',
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
    spaceId: {
      type: String,
      transformer: ValueObjectTransformer(SpaceId)
    },
    title: {
      type: String,
      transformer: ValueObjectTransformer(Title)
    },
    userId: {
      type: String,
      transformer: ValueObjectTransformer(UserId)
    },
    startDate: {
      type: Date,
      transformer: ValueObjectTransformer(StartDate)
    },
    endDate: {
      type: Date,
      transformer: ValueObjectTransformer(EndDate),
      nullable: true
    },
    bannerUrl: {
      type: String,
      transformer: ValueObjectTransformer(BannerUrl),
      nullable: true
    },
    isPaid: {
      type: Boolean,
      transformer: ValueObjectTransformer(IsPaid)
    },
    totalStudents: {
      type: Number,
      transformer: ValueObjectTransformer(TotalStudents)
    },
    maxStudents: {
      type: Number,
      transformer: ValueObjectTransformer(MaxStudents),
      nullable: true
    },
    totalComments: {
      type: Number,
      transformer: ValueObjectTransformer(TotalComments)
    },
    createdAt: {
      type: Date,
      transformer: ValueObjectTransformer(CreatedAt)
    },
    updatedAt: {
      type: Date,
      transformer: ValueObjectTransformer(UpdatedAt)
    },
    deletedAt: {
      type: Date,
      transformer: ValueObjectTransformer(DeletedAt),
      nullable: true
    }
  },
  indices: [
    {
      name: 'IDX_COURSE_COMMUNITY_ID',
      columns: ['communityId']
    },
    {
      name: 'IDX_COURSE_SPACE_ID',
      columns: ['spaceId']
    },
    {
      name: 'IDX_COURSE_USER_ID',
      columns: ['userId']
    }
  ],
  embeddeds: {
    author: {
      schema: CourseAuthorSchema,
      prefix: 'author'
    },
    price: {
      schema: CoursePriceSchema,
      prefix: 'price'
    }
  }
})
