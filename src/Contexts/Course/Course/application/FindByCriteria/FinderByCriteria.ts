import { CourseRepository } from '@Course/Course/domain/CourseRepository'
import { Course } from '@Course/Course/domain/Course'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: CourseRepository) {}

  async find (criteria: Criteria): Promise<Array<Course>> {
    return await this.repository.search(criteria)
  }
}
