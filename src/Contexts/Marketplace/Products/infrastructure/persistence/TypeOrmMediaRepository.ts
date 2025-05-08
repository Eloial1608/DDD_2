import { TypeOrmRepository } from '@Shared/infrastructure/persistence/typeorm/TypeOrmRepository'
import { EntitySchema, Equal } from 'typeorm'
import { Nullable } from '@Shared/domain/Nullable'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { ProductSchema } from './entity/ProductSchema'
import { Product } from '@Marketplace/Products/domain/Product'
import { ProductRepository } from '@Marketplace/Products/domain/ProductRepository'
import { Id } from '@Marketplace/Products/domain/ValueObjects/Id'

export class TypeOrmProductRepository extends TypeOrmRepository<Product> implements ProductRepository {
  protected get entitySchema (): EntitySchema {
    return ProductSchema
  }

  async find (id: Id): Promise<Nullable<Product>> {
    return await (await this.repository()).findOneBy({ id: Equal(id) })
  }

  async search (criteria: Criteria): Promise<Product[]> {
    return (await this.criteriaToQueryBuilder(criteria)).getMany()
  }

  async persist (marketplace: Product): Promise<void> {
    await (await this.repository()).save(marketplace)
  }
}
