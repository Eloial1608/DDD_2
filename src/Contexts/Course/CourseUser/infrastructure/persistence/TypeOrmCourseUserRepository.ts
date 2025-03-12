import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { CourseUser } from '@Course/CourseUser/domain/CourseUser'
import { CourseUserSchema } from './entity/CourseUserSchema'
import { Id } from '@Course/CourseUser/domain/ValueObjects/Id'
import { CourseUserRepository } from '@Course/CourseUser/domain/CourseUserRepository'

export class TypeOrmCourseUserRepository extends TypeOrmRepository<CourseUser> implements CourseUserRepository {
  protected get entitySchema (): EntitySchema {
    return CourseUserSchema
  }

  async find (id: Id): Promise<Nullable<CourseUser>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<CourseUser[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (courseUser: CourseUser): Promise<void> {
    await (await this.repository()).save(courseUser)
  }
}
