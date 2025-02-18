import { Course } from '../domain/Course'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { CourseResponse, CourseResponseBody } from './CourseResponse'

export class CourseCollectionResponse implements QueryResponse<Array<CourseResponseBody>> {
  response: Array<CourseResponseBody>

  constructor (course: Array<Course>) {
    this.response = course.map(x => new CourseResponse(x).response)
  }
}
