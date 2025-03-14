import { CourseUser } from '../domain/CourseUser'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { CourseUserResponse, CourseUserResponseBody } from './CourseUserResponse'

export class CourseUserCollectionResponse implements QueryResponse<Array<CourseUserResponseBody>> {
  response: Array<CourseUserResponseBody>

  constructor (courseUser: Array<CourseUser>) {
    this.response = courseUser.map(x => new CourseUserResponse(x).response)
  }
}
