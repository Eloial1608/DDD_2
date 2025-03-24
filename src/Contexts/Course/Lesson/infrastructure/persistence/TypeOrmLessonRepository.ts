import { Lesson } from '@Course/Lesson/domain/Lesson'
import { LessonRepository } from '@Course/Lesson/domain/LessonRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { Lessonchema } from './entity/LessonSchema'
import { Id } from '@Course/Lesson/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmLessonRepository extends TypeOrmRepository<Lesson> implements LessonRepository {
  protected get entitySchema (): EntitySchema {
    return Lessonchema
  }

  async find (id: Id): Promise<Nullable<Lesson>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Lesson[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (lesson: Lesson): Promise<void> {
    await (await this.repository()).save(lesson)
  }
}
