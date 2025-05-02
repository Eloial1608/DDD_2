import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'
import { Lesson } from '../domain/Lesson'

export type LessonResponseBody = {
  readonly id: string,
  readonly sectionId: string,
  readonly title: string,
  readonly content: string,
  readonly order: number
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
      content: lesson.content.valueOf(),
      order: lesson.order.valueOf(),
      createdAt: lesson.createdAt.valueOf(),
      updatedAt: lesson.updatedAt.valueOf()
    }
  }
}
