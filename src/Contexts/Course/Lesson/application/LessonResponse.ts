import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { Lesson } from '../domain/Lesson'

export type LessonResponseBody = {
  readonly id: String,
  readonly sectionId: String,
  readonly title: String,
  readonly type: String,
  readonly content: String,
  readonly createdAt: Date,
  readonly updatedAt: Date
}

export class LessonResponse implements QueryResponse<LessonResponseBody> {
  response: LessonResponseBody

  constructor (lesson: Lesson) {
    this.response = {
      id: lesson.id.valueOf(),
      sectionId: lesson.sectionId.valueOf(),
      title: lesson.title.valueOf(),
      type: lesson.type.valueOf(),
      content: lesson.content.valueOf(),
      createdAt: lesson.createdAt.valueOf(),
      updatedAt: lesson.updatedAt.valueOf()
    }
  }
}
