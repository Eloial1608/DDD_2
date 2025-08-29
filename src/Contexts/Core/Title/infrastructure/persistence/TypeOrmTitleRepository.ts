import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { Title } from '../../domain/Title'
import { TitleRepository } from '../../domain/TitleRepository'
import { EntitySchema, Equal } from 'typeorm'
import { TitleSchema } from './entity/TitleSchema'
import { Nullable } from '@Shared/domain/Nullable'
import { Id } from '../../domain/ValueObjects/Id'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmTitleRepository extends TypeOrmRepository<Title> implements TitleRepository {
  protected get entitySchema (): EntitySchema {
    return TitleSchema
  }

  async find (id: Id): Promise<Nullable<Title>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Title[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (title: Title): Promise<void> {
    await (await this.repository()).save(title)
  }
}
