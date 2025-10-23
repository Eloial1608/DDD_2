import { PageView } from '@Metrics/PageView/domain/PageView'
import { PageViewRepository } from '@Metrics/PageView/domain/PageViewRepository'
import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { PageViewSchema } from './entity/PageViewSchema'
import { Id } from '@Metrics/PageView/domain/ValueObjects/Id'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'

export class TypeOrmPageViewRepository extends TypeOrmRepository<PageView> implements PageViewRepository {
  protected get entitySchema (): EntitySchema {
    return PageViewSchema
  }

  async find (id: Id): Promise<Nullable<PageView>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<PageView[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (pageview: PageView): Promise<void> {
    await (await this.repository()).save(pageview)
  }
}
