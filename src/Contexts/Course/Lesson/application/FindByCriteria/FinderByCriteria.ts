import { Lesson } from '@Course/Lesson/domain/Lesson'
import { LessonRepository } from '@Course/Lesson/domain/LessonRepository'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: LessonRepository) {}

  async find (criteria: Criteria): Promise<Array<Lesson>> {
    return await this.repository.search(criteria)
  }
}
