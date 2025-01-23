import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Section } from '@Course/Section/domain/Section'
import { SectionRepository } from '@Course/Section/domain/SectionRepository'
import { SectionSchema } from './entity/SectionSchema'
import { Id } from '@Course/Section/domain/ValueObjects/Id'

export class TypeOrmCourseRepository extends TypeOrmRepository<Section> implements SectionRepository {
  protected get entitySchema (): EntitySchema {
    return SectionSchema
  }

  async find (id: Id): Promise<Nullable<Section>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Section[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (section: Section): Promise<void> {
    await (await this.repository()).save(section)
  }

  async delete (section: Section): Promise<void> {
    await (await this.repository()).remove(section)
  }
}
