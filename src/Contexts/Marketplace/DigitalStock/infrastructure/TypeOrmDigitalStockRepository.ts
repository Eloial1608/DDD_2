import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import type { DigitalStock } from '../domain/DigitalStock'
import { DigitalStockSchema } from './entity/DigitalStock.schema'
import type { DigitalStockRepository } from '../domain/DigitalStockRepository'
import type { Id } from '../domain/ValueObjects/Id'
import type { Nullable } from '@Shared/domain/Nullable'
import type { Criteria } from '@Shared/domain/Criteria/Criteria'
import type { EntitySchema } from 'typeorm'
import { Equal } from 'typeorm'

export class TypeOrmDigitalStockRepository extends TypeOrmRepository<DigitalStock> implements DigitalStockRepository {
  protected get entitySchema (): EntitySchema {
    return DigitalStockSchema
  }

  async find (id: Id): Promise<Nullable<DigitalStock>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<DigitalStock[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (stock: DigitalStock): Promise<void> {
    await (await this.repository()).save(stock)
  }

  async delete (stock: DigitalStock): Promise<void> {
    await (await this.repository()).remove(stock)
  }
}
