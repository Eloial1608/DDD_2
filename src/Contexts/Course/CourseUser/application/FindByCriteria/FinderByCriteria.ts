import { CourseUserRepository } from '@Course/CourseUser/domain/CourseUserRepository'
import { CourseUser } from '@Course/CourseUser/domain/CourseUser'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class FinderByCriteria {
  constructor (private readonly repository: CourseUserRepository) {}

  async find (criteria: Criteria): Promise<Array<CourseUser>> {
    return await this.repository.search(criteria)
  }
}
