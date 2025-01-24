import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Course } from '@Course/Course/domain/Course'
import { CourseRepository } from '@Course/Course/domain/CourseRepository'
import { CourseSchema } from './entity/CourseSchema'
import { Id } from '@Course/Course/domain/ValueObjects/Id'

export class TypeOrmCourseRepository extends TypeOrmRepository<Course> implements CourseRepository {
  protected get entitySchema (): EntitySchema {
    return CourseSchema
  }

  async find (id: Id): Promise<Nullable<Course>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Course[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (course: Course): Promise<void> {
    await (await this.repository()).save(course)
  }
}
