import { Content } from '@Media/Content/domain/Content'
import { ContentRepository } from '@Media/Content/domain/ContentRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { ContentSchema } from './entity/ContentSchema'
import { Id } from '@Media/Content/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmContentRepository extends TypeOrmRepository<Content> implements ContentRepository {
  protected get entitySchema (): EntitySchema {
    return ContentSchema
  }

  async find (id: Id): Promise<Nullable<Content>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Content[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (content: Content): Promise<void> {
    await (await this.repository()).save(content)
  }

  async delete (content: Content): Promise<void> {
    await (await this.repository()).remove(content)
  }
}
