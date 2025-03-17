import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { LessonResponse, LessonResponseBody } from './LessonResponse'
import { Lesson } from '../domain/Lesson'

export class LessonCollectionResponse implements QueryResponse<Array<LessonResponseBody>> {
  response: Array<LessonResponseBody>

  constructor (lesson: Array<Lesson>) {
    this.response = lesson.map(x => new LessonResponse(x).response)
  }
}
