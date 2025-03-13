import { CourseUser } from '@Course/CourseUser/domain/CourseUser'
import { CourseId } from '@Course/CourseUser/domain/ValueObjects/CourseId'
import { CreatedAt } from '@Course/CourseUser/domain/ValueObjects/CreatedAt'
import { Id } from '@Course/CourseUser/domain/ValueObjects/Id'
import { UserId } from '@Course/CourseUser/domain/ValueObjects/UserId'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'

export const CourseUserSchema = new EntitySchema<CourseUser>({
  name: 'CourseUser',
  target: CourseUser,
  tableName: 'course_user',
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
    courseId: {
      type: String,
      transformer: ValueObjectTransformer(CourseId)
    },
    createdAt: {
      type: Date,
      createDate: true,
      transformer: ValueObjectTransformer(CreatedAt)
    }
  },
  indices: [
    {
      name: 'IDX_COURSE_USER_USER_ID',
      columns: ['userId']
    },
    {
      name: 'IDX_COURSE_USER_COURSE_ID',
      columns: ['courseId']
    }
  ]
})
