import { CourseRepository } from '@Course/Course/domain/CourseRepository'
import { Id } from '@Course/Course/domain/ValueObjects/Id'
import { Course } from '@Course/Course/domain/Course'
import { CourseNotFound } from '@Course/Course/domain/Errors/CourseNotFound'

export class FinderById {
  constructor (private readonly repository: CourseRepository) {}

  async find (id: Id): Promise<Course> {
    const course = await this.repository.find(id)

    if (!course) throw new CourseNotFound(id)

    return course
  }
}
