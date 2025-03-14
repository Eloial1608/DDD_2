import { Nullable } from '@Shared/domain/Nullable'
import { Course } from '../domain/Course'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type CourseResponseBody = {
  readonly id: string,
  readonly communityId: string,
  readonly spaceId: string,
  readonly userId: string,
  readonly author: {
    id: string
    mainId: string
    name: string
    username: string
    bannerUrl: Nullable<string>
    pictureUrl: Nullable<string>
  }
  readonly title: string,
  readonly bannerUrl: Nullable<string>,
  readonly isPaid: boolean,
  readonly price: Nullable<{value: number, currency: string}>
  readonly startDate: Date,
  readonly endDate: Nullable<Date>,
  readonly maxStudents: Nullable<number>,
  readonly totalStudents: number,
  readonly totalComments: number,
  readonly createdAt: Date,
  readonly updatedAt: Date,
  readonly deletedAt: Nullable<Date>
}

export class CourseResponse implements QueryResponse<CourseResponseBody> {
  response: CourseResponseBody

  constructor (course: Course) {
    this.response = {
      id: course.id.valueOf(),
      communityId: course.communityId.valueOf(),
      spaceId: course.spaceId.valueOf(),
      userId: course.userId.valueOf(),
      author: course.author.toPrimitives(),
      title: course.title.valueOf(),
      bannerUrl: course.bannerUrl?.valueOf(),
      isPaid: course.isPaid.valueOf(),
      price: course.price
        ? {
            value: course.price.value.valueOf(),
            currency: course.price.currency.valueOf()
          }
        : null,
      startDate: course.startDate.valueOf(),
      endDate: course.endDate?.valueOf(),
      maxStudents: course.maxStudents?.valueOf(),
      totalStudents: course.totalStudents.valueOf(),
      totalComments: course.totalComments.valueOf(),
      createdAt: course.createdAt.valueOf(),
      updatedAt: course.updatedAt.valueOf(),
      deletedAt: course.deletedAt?.valueOf()
    }
  }
}
