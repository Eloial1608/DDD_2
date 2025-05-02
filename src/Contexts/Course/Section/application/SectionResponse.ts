import { Nullable } from '@Shared/domain/Nullable'
import { Section } from '../domain/Section'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type SectionResponseBody = {
    readonly id: string,
    readonly courseId: string,
    readonly title: string,
    readonly description: Nullable<string>
    totalLessons: number,
    readonly createdAt: Date,
    readonly updatedAt: Date
}

export class SectionResponse implements QueryResponse<SectionResponseBody> {
  response: SectionResponseBody

  constructor (section: Section) {
    this.response = {
      id: section.id.valueOf(),
      courseId: section.courseId.valueOf(),
      title: section.title.valueOf(),
      description: section.description?.valueOf(),
      totalLessons: section.totalLessons.valueOf(),
      createdAt: section.createdAt.valueOf(),
      updatedAt: section.updatedAt.valueOf()
    }
  }
}
