import { CourseUser } from '../domain/CourseUser'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type CourseUserResponseBody = {
    readonly id: string
    readonly userId: string
    readonly courseId: string
    readonly createdAt: Date
}

export class CourseUserResponse implements QueryResponse<CourseUserResponseBody> {
  response: CourseUserResponseBody

  constructor (courseUser: CourseUser) {
    this.response = {
      id: courseUser.id.valueOf(),
      userId: courseUser.userId.valueOf(),
      courseId: courseUser.courseId.valueOf(),
      createdAt: courseUser.createdAt.valueOf()
    }
  }
}
